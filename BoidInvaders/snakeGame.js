class snakeGame
{
    playAreaSize = 300;
    xDir = 20;
    yDir = 0;
    snakeXPos = 0;
    snakeYPos = 0;
    snakeBodyPos = [[0,0]];
    snakeBodyLength = 3;
    pixelsToMovePerTick = 20;

    appleX = 0;
    appleY = 0;
    //
    //GARETH:   setInterval() is the magic glue that makes html pages animate.
    //          It takes a function() that contains all the code that will get
    //          executed each iteration and the number of mS between each iteration
    //          Given that 60fps is 1000mS/60 = 16.666, I use 17
    //

    Init()
{
    for(var i = 0; i < this.snakeBodyLength; i++)
    {
        this.snakeBodyPos[i] = [0,0];
    }
    this.placeApple();
}

    Run()
{
    Init();

    setInterval(function()
    {
        //GARETH: get the canvas component from the HTML document and pick up the 2D context
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        //GARETH: set the canvas size to the current window size, else bits wont get drawn to
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        //GARETH: draw a rectangle that's the size of the screen, this will clear it
        ctx.fillStyle = 'rgba(32,32,32,255)';
        ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
        //Draw play area
        ctx.fillStyle = 'rgba(255,255,255,255)';
        ctx.fillRect(0,0,this.playAreaSize,this.playAreaSize);
        //Max - Update snakes body position
        for(var i = this.snakeBodyLength - 1; i > 0; i-=1)
        {
            this.snakeBodyPos[i] = this.snakeBodyPos[i-1];
        }

        this.snakeBodyPos[0] = [this.snakeXPos,this.snakeYPos];
        //Max - move the snake in the current direction
        this.snakeXPos += this.xDir;
        this.snakeYPos += yDir;


        //Max - Check if the snake is on the apple
        if(this.snakeXPos == this.appleX && this.snakeYPos == this.appleY)
        {
            this.placeApple();
        }

        //Max - Draw the snake's head
        ctx.fillStyle = 'rgba(0,255,0,255)';
        ctx.fillRect(snakeXPos,snakeYPos,20,20);

        //Max - Draw the snake's body
        ctx.fillStyle = 'rgba(0,0,255,255)';
        for(var i = 0; i < this.snakeBodyLength - 1; i+=1)
        {
            ctx.fillRect(this.snakeBodyPos[i][0],this.snakeBodyPos[i][1],20,20);
        }
        //Max - Draw the apple
        ctx.fillStyle = 'rgba(255,0,0,255)';
        ctx.fillRect(this.appleX,this.appleY,20,20);

        //Max - Check if play area exceeded
        if(snakeXPos >= this.playAreaSize || this.snakeXPos < 0 || this.snakeYPos >= this.playAreaSize || this.snakeYPos < 0)
        {
            this.reset();
        }
        //Max - Check if head collides with body
        for(var i = 0; i < this.snakeBodyLength - 1; i++)
        {
            if(snakeXPos == snakeBodyPos[i][0] && snakeYPos == snakeBodyPos[i][1])
            {
                this.reset();
            }
        }
    },100);
}

    placeApple()
{
    this.appleX = Math.floor(Math.random() * 30) * 20;
    this.appleY = Math.floor(Math.random() * 30) * 20;
    this.snakeBodyLength++;
}
    onKeyPress(e)
{
    var keyCode = e.key;
    if(keyCode == 'w' && this.yDir == 0){this.xDir = 0; this.yDir = -this.pixelsToMovePerTick ;} //Up
    else if(keyCode == 'd' && this.xDir == 0){this.xDir = this.pixelsToMovePerTick ; this.yDir = 0;}//Right
    else if(keyCode == 'a' && this.xDir == 0){this.xDir = -this.pixelsToMovePerTick ; this.yDir = 0;}//Left
    else if(keyCode == 's' && this.yDir == 0){this.xDir = 0; this.yDir = this.pixelsToMovePerTick ;}//Down
}
    reset()
{
    this.snakeXPos = 0;
    this.snakeYPos = 0;
    this. xDir = 20;
    this.yDir = 0;
    this.snakeBodyLength = 3;
    this.placeApple();
}

    //Listen for a keypress
    window.addEventListener("keypress",onKeyPress);
}
