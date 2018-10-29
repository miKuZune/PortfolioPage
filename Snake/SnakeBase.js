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
        this.appleX = 0;
        this.appleY = 0;
        this.PlaceApple();

        //Create the snake
        this.snakeGridX = parseInt(this.width/2);
        this.snakeGridY = parseInt(this.height/3);
        this.snakeState = "up";

        //Create an array to store the snakes body.
        this.snakeBodyLength = 3;
        this.snakeBodyArr = [0,0];
        for(var i = 0; i < this.snakeBodyLength; i++)
        {
            this.snakeBodyArr[i] = [this.snakeGridX,this.snakeGridY];
        }
    }

    //
    PlaceApple()
    {
        //Choose two random x and y positions within the grid array and store the apple at that position.
        this.appleX = parseInt(Math.random() * this.width);
        this.appleY = parseInt(Math.random() * this.height);
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


            //Handle the snake AI
            SnakeAI_Inst.Execute();

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



            //Handle the snake's body.
            var tempArr = [0,0];

            for(var i = 0; i < SnakeInst.snakeBodyLength; i++)
            {
                tempArr[i] = SnakeInst.snakeBodyArr[i + 1];
            }
            tempArr[SnakeInst.snakeBodyLength - 1] = [SnakeInst.snakeGridX, SnakeInst.snakeGridY];
            //Store the new postion of the snake.
            var snakeVec = SnakeInst.grid[SnakeInst.snakeGridX][SnakeInst.snakeGridY];

            SnakeInst.snakeBodyArr = tempArr;

            //Check if the snake has reached the target

            if(SnakeInst.snakeGridX == SnakeInst.appleX && SnakeInst.snakeGridY == SnakeInst.appleY)
            {
                SnakeInst.PlaceApple();

                var x = SnakeInst.snakeBodyArr[SnakeInst.snakeBodyLength - 1][0];
                var y = SnakeInst.snakeBodyArr[SnakeInst.snakeBodyLength - 1][1];
                SnakeInst.snakeBodyLength++;
                SnakeInst.snakeBodyArr.push([x,y]);


            }


            //Draw gameobjects.
            //Draw target.
            ctx.fillStyle = 'rgba(255,0,0,255)';
            var appleVec = SnakeInst.grid[SnakeInst.appleX][SnakeInst.appleY];
            ctx.fillRect(appleVec.x, appleVec.y,  SnakeInst.objsSize, SnakeInst.objsSize );
            //Draw snake
            ctx.fillStyle = 'rgba(0,255,255,255)';
            ctx.fillRect(snakeVec.x, snakeVec.y, SnakeInst.objsSize,SnakeInst.objsSize);
            //Draw snake's body
            for(var i = 0; i < SnakeInst.snakeBodyLength;i++)
            {
                var bodyVec = SnakeInst.grid[SnakeInst.snakeBodyArr[i][0]][SnakeInst.snakeBodyArr[i][1]];
                ctx.fillRect(bodyVec.x,bodyVec.y, SnakeInst.objsSize, SnakeInst.objsSize);
            }
        }, 17);
    }
}
SnakeInst = new SnakeBase();

//Global variables
areaStartPos = 0;
areaSize = 600;
