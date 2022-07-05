function display(maze)
{
    const rectWidth=canvas.width/maze[0].length;
    const rectHeight=canvas.height/maze.length;
    const blocks=["#", "?", "!", "%", "S", "F", "@"];
    const colors=["black", "lightblue", "blue", "lightpurple", "green", "red", "yellow"];
    for (let row=0; row < maze.length; row++)
    {
        for (let col=0; col < maze[0].length; col++)
        {
            blocks.forEach(block=>{
                if (maze[row][col] == block)
                {
                    ctx.beginPath();
                    ctx.fillStyle=colors[blocks.indexOf(block)];
                    ctx.rect(rectWidth*col, rectHeight*row, rectWidth, rectHeight);
                    ctx.fill();
                }
            })
            // if (maze[row][col] == "#")
            // {
            //     ctx.beginPath();
            //     ctx.fillStyle="black";
            //     ctx.rect(rectWidth*col, rectHeight*row, rectWidth, rectHeight);
            //     ctx.fill();
            // }
            // if (maze[row][col] == "?")
            // {
            //     ctx.beginPath();
            //     ctx.fillStyle="lightblue";
            //     ctx.rect(rectWidth*col, rectHeight*row, rectWidth, rectHeight);
            //     ctx.fill();
            // }
            // if (maze[row][col] == "!")
            // {
            //     ctx.beginPath();
            //     ctx.fillStyle="blue";
            //     ctx.rect(rectWidth*col, rectHeight*row, rectWidth, rectHeight);
            //     ctx.fill();
            // }
            // if (maze[row][col] == "S")
            // {
            //     ctx.beginPath();
            //     ctx.fillStyle="green";
            //     ctx.rect(rectWidth*col, rectHeight*row, rectWidth, rectHeight);
            //     ctx.fill();
            // }
            // if (maze[row][col] == "F")
            // {
            //     ctx.beginPath();
            //     ctx.fillStyle="red";
            //     ctx.rect(rectWidth*col, rectHeight*row, rectWidth, rectHeight);
            //     ctx.fill();
            // }
        }
    }
}
function genMaze(rows, cols)
{
    let maze=[];
    for (let row=0; row < rows; row++)
    {
        maze.push("#");
        for (let col=0; col < cols-2; col++)
        {
            row == 0 || row == rows-1 ? maze[row]+="#" : maze[row]+=" ";
        }
        maze[row]+="#";
    }
    return maze;
}
String.prototype.replaceAt = function(index, replacement)
{
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
Array.prototype.log = function(elementsPerRow)
{
    for (let i=0; i < this.length/elementsPerRow; i++)
    {
        console.log(this.slice(i, i+elementsPerRow));
    }
}