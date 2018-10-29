class SnakeBase
{
    Init()
    {
		areaStartPos = (window.innerWidth / 2) - (areaSize / 2);
		
        //Initalise the snake grid.
        this.grid = [[new Vector2(0,0)]];

        this.objsSize = 20;
        this.width = areaSize / this.objsSize;
        this.height = areaSize / this.objsSize;

        //Create a 2d Array for the grid.
        for(var i = 0; i < this.width; i++)
        {
            //Create a new line for data to be stored.
            this.grid[i] = [new Vector2(0,0)];
            for(var j = 0; j < this.height; j++)
            {
                this.grid[i][j] = new Vector2(areaStartPos + (i * this.objsSize), j * this.objsSize);
            }
        }


        //Create and place the snake target.

        this.appleVec = new Vector2(0,0);
        this.PlaceApple();

        //Create the snake
        this.snakeGridX = parseInt(this.width/2);
        this.snakeGridY = parseInt(this.height/3);
        this.snakeState = "up";
    }

    //
    PlaceApple()
    {
        //Choose two random x and y positions within the grid array and store the apple at that position.
        var randX = parseInt(Math.random() * this.width);
        var randY = parseInt(Math.random() * this.height);

        this.appleVec = this.grid[randX][randY];

    }

    DrawCanvas(ctx,areaSize)
    {


        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        //Fill in a background for the whole page.
        ctx.fillStyle = 'rgba(32,32,32,255)';
        ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
        //Fill in the playable area.
        ctx.fillStyle = 'rgba(255,255,255,255)';
        ctx.fillRect(areaStartPos,0,areaSize,areaSize);
    }

    Run()
    {
        this.Init();

        setInterval(function()
        {
            //Draw the canvas onto the screen.
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");

            SnakeInst.DrawCanvas(ctx, areaSize);

            //Handle the snakes direction
            switch(SnakeInst.snakeState)
            {
                case "up":
                        SnakeInst.snakeGridY--;
                    break;
                case "down":
                        SnakeInst.snakeGridY++;
                    break;
                case "left":
                        SnakeInst.snakeGridX--;
                    break;
                case "right":
                        SnakeInst.snakeGridX++;
                    break;
            }
            //Store the new postion of the snake.
            var snakeVec = SnakeInst.grid[SnakeInst.snakeGridX][SnakeInst.snakeGridY];


            //Draw gameobjects.
            //Draw target.
            ctx.fillStyle = 'rgba(255,0,0,255)';
            ctx.fillRect(SnakeInst.appleVec.x, SnakeInst.appleVec.y,  SnakeInst.objsSize, SnakeInst.objsSize );
            //Draw snake
            ctx.fillStyle = 'rgba(0,255,255,255)';
            ctx.fillRect(snakeVec.x, snakeVec.y, SnakeInst.objsSize,SnakeInst.objsSize);
        }, 250);
    }


}

SnakeInst = new SnakeBase();

//Global variables
areaStartPos = 0;
areaSize = 600;
