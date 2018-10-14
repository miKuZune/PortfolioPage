
    playAreaSize = 600;
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

    function Init()
    {
        for(var i = 0; i < snakeBodyLength; i++)
        {
            snakeBodyPos[i] = [0,0];
        }
        placeApple();
    }

   function Run()
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
            ctx.fillRect(0,0,playAreaSize,playAreaSize);
            //Max - Update snakes body position
            for(var i = snakeBodyLength - 1; i > 0; i-=1)
            {
                snakeBodyPos[i] = snakeBodyPos[i-1];
            }

            snakeBodyPos[0] = [snakeXPos,snakeYPos];
            //Max - move the snake in the current direction
            snakeXPos += xDir;
            snakeYPos += yDir;


            //Max - Check if the snake is on the apple
            if(snakeXPos == appleX && snakeYPos == appleY)
            {
                placeApple();
            }

            //Max - Draw the snake's head
            ctx.fillStyle = 'rgba(0,255,0,255)';
            ctx.fillRect(snakeXPos,snakeYPos,20,20);

            //Max - Draw the snake's body
            ctx.fillStyle = 'rgba(0,0,255,255)';
            for(var i = 0; i < snakeBodyLength - 1; i+=1)
            {
                ctx.fillRect(snakeBodyPos[i][0],snakeBodyPos[i][1],20,20);
            }
            //Max - Draw the apple
            ctx.fillStyle = 'rgba(255,0,0,255)';
            ctx.fillRect(appleX,appleY,20,20);

            //Max - Check if play area exceeded
            if(snakeXPos >= playAreaSize || snakeXPos < 0 || snakeYPos >= playAreaSize || snakeYPos < 0)
            {
                reset();
            }
            //Max - Check if head collides with body
            for(var i = 0; i < snakeBodyLength - 1; i++)
            {
                if(snakeXPos == snakeBodyPos[i][0] && snakeYPos == snakeBodyPos[i][1])
                {
                    reset();
                }
            }
        },100);
    }

    function placeApple()
{
    appleX = Math.floor(Math.random() * 30) * 20;
    appleY = Math.floor(Math.random() * 30) * 20;
    snakeBodyLength++;
}
    function onKeyPress(e)
{
    var keyCode = e.key;
    if(keyCode == 'w' && yDir == 0){xDir = 0; yDir = -pixelsToMovePerTick ;} //Up
    else if(keyCode == 'd' && xDir == 0){xDir = pixelsToMovePerTick ; yDir = 0;}//Right
    else if(keyCode == 'a' && xDir == 0){xDir = -pixelsToMovePerTick ; yDir = 0;}//Left
    else if(keyCode == 's' && yDir == 0){xDir = 0; yDir = pixelsToMovePerTick ;}//Down
}
    function reset()
{
    snakeXPos = 0;
    snakeYPos = 0;
    xDir = 20;
    yDir = 0;
    snakeBodyLength = 3;
    placeApple();
}

    //Listen for a keypress
    window.addEventListener("keypress",onKeyPress);