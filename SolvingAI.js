class SolvingAI
{
    constructor(maze, width, height)
    {
        this.maze = maze;
        this.blockWidth=width;
        this.blockHeight=height;
        this.start=[maze[0].indexOf("S"), 0];
        this.finish=[maze[maze.length-1].indexOf("F"), maze.length-1];
        this.current=this.start;
        this.visited=[];
        this.visitedCrosses=[];
    }
    reset()
    {
        this.current=this.start;
        this.visited=[];
        this.visitedCrosses=[];
    }
    findSpareCrosses(maze)
    {
        while (true)
        {
            if (this.markVisited(this.spaces(maze, this.visitedCrosses[this.visitedCrosses.length-1][0], this.visitedCrosses[this.visitedCrosses.length-1][1])).length >= 2)
            {
                //console.log("Last cross has " + this.markVisited(this.spaces(maze, this.visitedCrosses[this.visitedCrosses.length-1][0], this.visitedCrosses[this.visitedCrosses.length-1][1])).length + " spaces. Continued.");
                break;
            }
            else 
            {
                //console.log("Last cross has " + this.markVisited(this.spaces(maze, this.visitedCrosses[this.visitedCrosses.length-1][0], this.visitedCrosses[this.visitedCrosses.length-1][1])).length + " spaces. The element has been removed.");
                this.visitedCrosses.pop();
            }
        }
        return this.visitedCrosses[this.visitedCrosses.length-1];
    }
    markVisited(spaces)
    {
        // console.log(this.visited.includes(this.moveTo(spaces[0]).toString()));
        return spaces.filter(space=>this.visited.includes(this.moveTo(space).toString()) !== true);
    }
    moveTo(direction)
    {
        // console.log("Direction: "+direction);
        if (confirm) this.visited.push(this.current.toString());
        if (direction=="up") return [this.current[0], this.current[1]-1];
        if (direction=="down") return [this.current[0], this.current[1]+1];
        if (direction=="left") return [this.current[0]-1, this.current[1]];
        if (direction=="right") return [this.current[0]+1, this.current[1]];
    }
    spaces(maze, x, y)
    {
        let spaces=["up","down","left", "right"];
        if (y == 0 || maze[y-1][x] == "#") spaces=spaces.filter(sp=>sp !== "up");
        if (y == maze.length-1 || maze[y+1][x] == "#") spaces=spaces.filter(sp=>sp !== "down");
        if (x == 0 || maze[y][x-1] == "#") spaces=spaces.filter(sp=>sp !== "left");
        if (x == maze[0].length-1 || maze[y][x+1] == "#") spaces=spaces.filter(sp=>sp !== "right");
        return spaces;
    }
    markPoints(maze)
    {
        let result=[];
        for (let row=0; row < maze.length; row++)
        {
            result.push("#");
            for (let col=1; col < maze[0].length; col++)
            {
                if ((maze[row][col] == " ") && (this.spaces(maze, col, row).length != 2))
                {
                    if (this.spaces(maze, col, row).length > 2) result[row]+="?";
                    if (this.spaces(maze, col, row).length < 2) result[row]+="!";
                }
                else result[row]+=maze[row][col];
            }
        }
        return result;
    }
    markRoute(maze)
    {
        let result=[];
        for (let row=0; row < maze.length; row++)
        {
            result.push("#");
            for (let col=1; col < maze[0].length; col++)
            {
                if (this.visited.includes([col, row].toString()))
                {
                    result[row]+="@";
                }
                else result[row]+=maze[row][col];
            }
        }
        return result;
        // ctx.lineWidth=this.blockWidth;
        // ctx.beginPath();
        // ctx.strokeStyle="rgba(255, 255, 0, 0.3)";
        // ctx.moveTo(this.current[0]*this.blockWidth+this.blockWidth/2, this.current[1]*this.blockHeight+this.blockHeight/2);
        // ctx.lineTo(aim[0]*this.blockWidth+this.blockWidth/2, aim[1]*this.blockHeight+this.blockHeight/2);
        // ctx.stroke();
        // this.current=aim;
    }
}