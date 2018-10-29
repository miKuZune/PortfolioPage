class SnakeAI
{
    Init()
    {

    }

    Execute()
    {
        /*switch(SnakeInst.snakeState)
        {
            case "up":
                SnakeInst.snakeState = "left";
                break;
            case "down":
                SnakeInst.snakeState = "right";
                break;
            case "left":
                SnakeInst.snakeState = "down";
                break;
            case "right":
                SnakeInst.snakeState = "up";
                break;

        }*/
        var snakeHeadX = SnakeInst.snakeGridX;
        var snakeHeadY = SnakeInst.snakeGridY;
        var targetX = SnakeInst.appleX;
        var targetY = SnakeInst.appleY;


        var xDelta = snakeHeadX - targetX;
        var yDelta = snakeHeadY - targetY;

        if(yDelta > 0)
        {
            SnakeInst.snakeState = "up";
        }else if(xDelta > 0)
        {
            SnakeInst.snakeState = "left";
        }else if(yDelta < 0)
        {
            SnakeInst.snakeState = "down";
        }else if(xDelta < 0)
        {
            SnakeInst.snakeState = "right";
        }
    }
}
SnakeAI_Inst = new SnakeAI();