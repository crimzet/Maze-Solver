class Maze
{
    constructor(src, width, height)
    {
        this.src = src;
        this.width = width;
        this.height = height;
        this.maze=[];
    }
    imgToMaze(callback)
    {
        let img=new Image();
        img.src = this.src;
        img.onload=()=>{
            const context=document.createElement('canvas').getContext("2d");
            context.drawImage(img, 0, 0);
            for (let y=0; y < img.height; y++) 
            {
                this.maze.push("#")
                for (let x=1; x < img.width; x++) 
                {
                    const arr=context.getImageData(x, y, 1, 1).data.slice(0,3);
                    if (arr[0]==0 && arr[1]==0 && arr[2]==0) this.maze[y]+="#";
                    if (arr[0]==255 && arr[1]==255 && arr[2]==255) this.maze[y]+=" ";
                    if (arr[0]==255 && arr[1]==0 && arr[2]==0) this.maze[y]+="F";
                    if (arr[0]==0 && arr[1]==255 && arr[2]==0) this.maze[y]+="S";
                }
            }
            this.blockWidth=this.width/this.maze[0].length;
            this.blockHeight=this.height/this.maze.length;
            callback(this.maze);
        };
    }
    getBlockPos(block)
    {
        let result = [];
        for (let row=0; row < this.maze.length; row++)
        {
            for (let col=1; col < this.maze[0].length; col++)
            {
                if (this.maze[row][col] == block) result.push([col, row]);
            }
        }
        return result;
    }
    display()
    {
        canvas.width=this.width;
        this.blocks=["#", "?", "!", "%", "S", "F"];
        this.colors=["black", "lightblue", "blue", "yellow", "green", "red"];
        for (let row=0; row < this.maze.length; row++)
        {
            for (let col=0; col < this.maze[0].length; col++)
            {
                this.blocks.forEach(block=>{
                    if (this.maze[row][col] == block)
                    {
                        ctx.beginPath();
                        ctx.fillStyle=this.colors[this.blocks.indexOf(block)];
                        ctx.rect(this.width*col, this.height*row, this.width, this.height);
                        ctx.fill();
                    }
                });
            }
        }
    }
}