const canvas=document.getElementById("canv");
canvas.width=600;
canvas.height=600;

const ctx=canvas.getContext("2d");
let speed = 1;

const m = new Maze(maze, canvas.width, canvas.height);
const loop=setInterval(()=>{
    try
    {
        if (m.run()) 
        {
            console.log("Finished");
            clearInterval(loop);
        }
        m.display();
    } catch(err)
    {
        console.error(err);
        clearInterval(loop);
    }
}, speed);
