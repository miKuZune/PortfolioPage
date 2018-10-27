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

        var j = 0; //Width counter
        var k = 0; //Height counter
        for(var i = 0; i < this.width * this.height; i++)
        {
            this.grid[i] = [areaStartPos +  (j * this.objsSize) , k * this.objsSize];
            j++;
            if(j > this.width - 1)
            {
                j = 0;
                k++;
            }
        }

        //Create and place the snake target.

        this.appleVec = new Vector2(0,0);

        this.PlaceApple();
    }

    //
    PlaceApple()
    {
        var newPos = Math.random() * (this.width * this.height);
        newPos =  parseInt(newPos);

        this.appleVec = new Vector2(this.grid[newPos][0], this.grid[newPos][1]);

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

            ctx.fillStyle = 'rgba(255,0,0,255)';

            ctx.fillRect(SnakeInst.appleVec.x, SnakeInst.appleVec.y,  SnakeInst.objsSize, SnakeInst.objsSize );



        }, 17);
    }


}

SnakeInst = new SnakeBase();

//Global variables
areaStartPos = 0;
areaSize = 600;
