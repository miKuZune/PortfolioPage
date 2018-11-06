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
        var openList = [];
        var closedList = [];
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
                newNode.SetX(i);
                newNode.SetY(j);

                var h = Math.sqrt((i - targetX) * (i - targetX)) + Math.sqrt((j - targetY) * (j - targetY));
                newNode.SetH(h);

                nodeArray[i][j] = newNode;
            }
        }

        closedList[0] = nodeArray[SnakeInst.snakeGridX][SnakeInst.snakeGridY];
        closedList[0].SetDir(SnakeInst.snakeState);

        var doingClosed = true;
        var j = 0;

        while(doingClosed)
        {
            switch(closedList[j].dir)
            {
                case "up":
                    var newNode = new Node();
                    //Right node
                    newNode = nodeArray[closedList[j].x+ 1][closedList[j].y];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y];
                    newNode.SetDir("right");

                    openList.push(newNode);
                    //Left node
                    newNode = nodeArray[closedList[j].x - 1][closedList[j].y];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y]
                    newNode.SetDir("left");

                    openList.push(newNode);
                    //Up node
                    newNode = nodeArray[closedList[j].x][closedList[j].y - 1];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y]
                    newNode.SetDir("up");

                    openList.push(newNode);
                    break;
                case "down":
                    var newNode = new Node();
                    //Right node
                    newNode = nodeArray[closedList[j].x + 1][closedList[j].y];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y]
                    newNode.SetDir("right");

                    openList.push(newNode);
                    //Left node
                    newNode = nodeArray[closedList[j].x - 1][closedList[j].y];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y]
                    newNode.SetDir("left");

                    openList.push(newNode);
                    //Down node
                    newNode = nodeArray[closedList[j].x][closedList[j].y + 1];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y]
                    newNode.SetDir("down");

                    openList.push(newNode);
                    break;
                case "left":
                    var newNode = new Node();

                    //Left node
                    newNode = nodeArray[closedList[j].x - 1][closedList[j].y];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y]
                    newNode.SetDir("left");

                    openList.push(newNode);
                    //Down node
                    newNode = nodeArray[closedList[j].x][closedList[j].y];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y]
                    newNode.SetDir("down");

                    openList.push(newNode);
                    //Up node
                    newNode = nodeArray[closedList[j].x][closedList[j].y - 1];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y]
                    newNode.SetDir("up");

                    openList.push(newNode);
                    break;
                case "right":
                    var newNode = new Node();

                    //Right node
                    newNode = nodeArray[SnakeInst.snakeGridX + 1][SnakeInst.snakeGridY];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y]
                    newNode.SetDir("right");

                    openList.push(newNode);
                    //Down node
                    newNode = nodeArray[SnakeInst.snakeGridX ][SnakeInst.snakeGridY + 1];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y]
                    newNode.SetDir("down");

                    openList.push(newNode);
                    //Up node
                    newNode = nodeArray[SnakeInst.snakeGridX][SnakeInst.snakeGridY - 1];
                    newNode.parent = nodeArray[closedList[j].x][closedList[j].y]
                    newNode.SetDir("up");

                    openList.push(newNode);
                    break;
            }

            var lowestValue = 0;
            var lowestList = [];
            for(var i = 0; i < openList.length; i++)
            {
                if(openList[i].h < lowestValue || lowestValue == 0)
                {
                    lowestList = [];
                    lowestValue = openList[i].h;
                    lowestList.push(openList[i]);
                }else if(openList[i].h == lowestValue)
                {
                    lowestList.push(openList[i]);
                }
            }

            for(var i = 0; i < lowestList.length; i++)
            {
                if(closedList.indexOf(lowestList[i]) == -1)
                {
                    closedList[closedList.length] = lowestList[i];

                    var ind = openList.indexOf(lowestList[i]);
                    openList.splice(ind);

                    if(lowestList[i].h <= 1)
                    {
                        doingClosed = false;
                    }
                }
            }

            console.log(closedList[closedList.length - 1]);

            j++;
            if(j > 80)
            {
                doingClosed = false;
            }

        }

        var testNode = closedList[closedList.length - 1];
        console.log(testNode);




        //Create an open and closed list of nodes.

        //Add the start node to the closed list and add the adjacent nodes to the open list, parent these nodes to the node in the closed list.

        //Calculate the f cost (cost to move to the node + it's distance from the target) of moving to each node

        //Take the ones with the lowest f values and add them to the closed list.
    }

}
SnakeAI_Inst = new SnakeAI();