const canvas=document.getElementById("canv");
canvas.width=600;
canvas.height=600;

const ctx=canvas.getContext("2d");
var speed = 50;
var img = "maze.png";

document.onclick = (e) => {
    if (e.target.matches(".btn"))
    {
        switch (document.getElementsByClassName("btn")[0] == e.target)
        {
            case true:
                e.target.classList.toggle("active");
                document.getElementsByClassName("content")[0].classList.toggle("active");
                document.getElementsByClassName("btn")[1].classList.remove("active");
                document.getElementsByClassName("content")[1].classList.remove("active");
                break;
            case false:
                e.target.classList.toggle("active");
                document.getElementsByClassName("content")[1].classList.toggle("active");
                document.getElementsByClassName("btn")[0].classList.remove("active");
                document.getElementsByClassName("content")[0].classList.remove("active");
                break;
            default:
                break;
        }
    }
    if (e.target.matches(".content > div > button"))
    {
        speed = parseInt(e.target.parentElement.children[1].value);
    }
}
document.onchange = (e) => {
    if (e.target.matches(".content > input"))
    {
        canvas.width = 600;
        img = e.target.files[0].name;
        const maze=new Maze(img, canvas.width, canvas.height);
        maze.imgToMaze((res)=>{
            const ai=new SolvingAI(res, maze.blockWidth, maze.blockHeight);
            maze.maze=ai.markPoints(res);
            display(maze.maze);

            var newMaze=maze.maze;
            const game=setInterval(()=>{
                try
                {
                    if (newMaze[ai.current[1]][ai.current[0]] !== "F")
                    {
                        //console.log("Current position: " + ai.current);
                        //console.log("Currently visited: " + ai.visited.join("  "));
                        if (newMaze[ai.current[1]][ai.current[0]] == "?")
                        {
                            let spaces=ai.spaces(newMaze, ai.current[0], ai.current[1]);
                            ai.visitedCrosses.push(ai.current);
                            // console.log(ai.markVisited(spaces));
                            ai.current=ai.moveTo(ai.markVisited(spaces)[Math.floor(Math.random()*ai.markVisited(spaces).length)], true);
                        }
                        else if (newMaze[ai.current[1]][ai.current[0]] == "!" || ai.markVisited(ai.spaces(newMaze, ai.current[0], ai.current[1])).length == 0)
                        {
                            ai.visited.push(ai.current.toString());
                            ai.visited=ai.visited.filter(v=>v !== ai.findSpareCrosses(newMaze).toString());
                            //console.log("Visited updated: " + ai.visited.join("  "));
                            ai.current=ai.visitedCrosses[ai.visitedCrosses.length-1];
                        }
                        else
                        {
                            let spaces=ai.spaces(newMaze, ai.current[0], ai.current[1]);
                            if (ai.markVisited(spaces).length > 0) ai.current=ai.moveTo(ai.markVisited(spaces)[0], true);
                        }
                        display(ai.markRoute(newMaze));
                    }
                    else 
                    {
                        console.log("Finish!");
                        clearInterval(game);
                    }
                } catch(e)
                {
                    newMaze=maze.maze;
                    ai.reset();
                    display(ai.markRoute(newMaze));
                }
            }, speed)
        });
    }
}