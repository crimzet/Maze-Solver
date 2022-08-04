class Maze
{
    constructor(file, width, height)
    {
        this.bW = width / file[0].length;
        this.bH = height / file.length;

        this.visited = [];
        this.string= file;

        this.pos = [1, this.string[0].indexOf("S")];

        this.blocks=["#", "S", "F", "@"];
        this.colors=["black", "rgba(0, 255, 0, 255)", "red", "yellow"];
    }
    spaces(y, x)
    {
        let res=[];
        if (y > 0 && y < this.string.length - 1 && x > 0 && x < this.string[0].length - 1)
        {
            if (this.string[y][x+1] == " ") res.push([y, x + 1]);
            if (this.string[y][x-1] == " ") res.push([y, x - 1]);
            if (this.string[y+1][x] == " ") res.push([y + 1, x]);
            if (this.string[y-1][x] == " ") res.push([y - 1, x]);

            if (this.string[y][x+1] == "F") res.push([y, x + 1]);
            if (this.string[y][x-1] == "F") res.push([y, x - 1]);
            if (this.string[y+1][x] == "F") res.push([y + 1, x]);
            if (this.string[y-1][x] == "F") res.push([y - 1, x]);
        }
        return res;
    }
    matchArrays(a, b)
    {
        for (let i = 0; i < a.length; i++) {
            if (a[i] != b[i]) return false;
        }
        return true;
    }
    randomChoice(a)
    {
        return a[Math.floor(Math.random() * a.length)];
    }
    markRoute()
    {
        for (let row=0; row < this.string.length; row++)
        {
            for (let col=1; col < this.string[0].length; col++)
            {
                this.visited.forEach(element => {
                    if (this.matchArrays(element, [row, col])) this.string[row][col] = "@";
                });
            }
        }
    }
    run()
    {
        if (!this.matchArrays(this.pos, [this.string.length - 1, this.string[this.string.length - 1].indexOf("F")]))
        {
            let moves = this.spaces(this.pos[0], this.pos[1]);

            if (moves.length == 1) 
            {
                this.visited.push([this.pos[0], this.pos[1]]);

                this.pos[0] = moves[0][0];
                this.pos[1] = moves[0][1];
            }
            if (moves.length > 1)
            {
                this.visited.push([this.pos[0], this.pos[1]]);
                let choice = this.randomChoice(moves);

                this.pos[0] = choice[0];
                this.pos[1] = choice[1];
            }
            if (moves.length == 0)
            {
                this.string[this.pos[0]][this.pos[1]] = "!";

                this.pos[0] = this.visited[this.visited.length - 1][0];
                this.pos[1] = this.visited[this.visited.length - 1][1];
                
                this.visited.pop();
            }
            
            this.markRoute();
        } else return true;
    }
    display()
    {
        canvas.width=600;
        for (let row=0; row < this.string.length; row++)
        {
            for (let col=0; col < this.string[0].length; col++)
            {
                this.blocks.forEach(block=>{
                    if (this.string[row][col] == block)
                    {
                        ctx.beginPath();
                        ctx.fillStyle=this.colors[this.blocks.indexOf(block)];
                        ctx.rect(this.bW*col, this.bH*row, this.bW, this.bH);
                        ctx.fill();
                    }
                });
            }
        }
    }
}
