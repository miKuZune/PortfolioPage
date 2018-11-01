class SnakeAI
{
    Init()
    {

    }

    Execute()
    {
        var snakeHeadX = SnakeInst.snakeGridX;
        var snakeHeadY = SnakeInst.snakeGridY;
        var targetX = SnakeInst.appleX;
        var targetY = SnakeInst.appleY;


        var xDelta = snakeHeadX - targetX;
        var yDelta = snakeHeadY - targetY;

        var currX_Dir = 0;
        var currY_Dir = 0;

        switch(SnakeInst.snakeState)
        {
            case "up":
                currX_Dir = 0;
                currY_Dir = -1;
                break;
            case "down":
                currX_Dir = 0;
                currY_Dir = 1;
                break;
            case "left":
                currX_Dir = -1;
                currY_Dir = 0;
                break;
            case "right":
                currX_Dir = 1;
                currY_Dir = 0;
                break;
        }

        if(yDelta > 0 && currY_Dir != 1)
        {
            SnakeInst.snakeState = "up";
        }else if(xDelta > 0 && currX_Dir != 1)
        {
            SnakeInst.snakeState = "left";
        }else if(yDelta < 0 && currY_Dir != -1)
        {
            SnakeInst.snakeState = "down";
        }else if(xDelta < 0 && currX_Dir != -1)
        {
            SnakeInst.snakeState = "right";
        }else
        {
            if(SnakeInst.snakeState != "up")
            {
                SnakeInst.snakeState = "up";
            }else
            {
                SnakeInst.snakeState = "down";
            }
        }
    }
}
SnakeAI_Inst = new SnakeAI();