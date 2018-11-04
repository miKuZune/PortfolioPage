class SnakeAI
{
    Init()
    {
        this.A_StarPathFind();
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

    A_StarPathFind()
    {
        //Create a list of nodes - each with it's own h value (it's distance from the target) and space for a parent (relation to adjacent node.
        var targetX = SnakeInst.appleX;
        var targetY = SnakeInst.appleY;

        console.log(targetX + ":" + targetY);

        var nodeArray = [[null]];
        //console.log(nodeArray);
        for(var i = 0; i < SnakeInst.grid.length; i++)
        {
            nodeArray[i] = [new Node()];
            for(var j = 0; j < SnakeInst.grid[i].length; j++)
            {
                var newNode = new Node();
                newNode.SetX(SnakeInst.grid[i][j].x);
                newNode.SetY(SnakeInst.grid[i][j].y);

                var h = Math.sqrt((i - targetX) * (i - targetX)) + Math.sqrt((j - targetY) * (j - targetY));
                newNode.SetH(h);
                nodeArray[i][j] = newNode;
            }
        }

        console.log(nodeArray);




        //Create an open and closed list of nodes.

        //Add the start node to the closed list and add the adjacent nodes to the open list, parent these nodes to the node in the closed list.

        //Calculate the f cost (cost to move to the node + it's distance from the target) of moving to each node

        //Take the ones with the lowest f values and add them to the closed list.
    }

}
SnakeAI_Inst = new SnakeAI();