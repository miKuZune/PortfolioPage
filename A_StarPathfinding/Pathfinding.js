class Pathfinding
{
    constructor(newGrid, newStartPos, newTargetPos)
    {
        this.grid = newGrid;
        this.startPos = newStartPos;
        this.targetPos = newTargetPos;
    }

    Init(newGrid, newStartPos, newTargetPos)
    {
        this.grid = newGrid;
        this.startPos = newStartPos;
        this.targetPos = newTargetPos;
    }

    FindPath(startNodeID, targetNodeID)
    {
        var startNode = this.grid.grid[startNodeID.x][startNodeID.y];
        var targetNode = this.grid.grid[targetNodeID.x][targetNodeID.y];

        var openList = [];
        var closedList = [];

        var finalPathFound = false;

        openList.push(startNode);

        while(openList.length > 0 && !finalPathFound)
        {
            var currNode = openList[0];
            var currNodeID = 0;


            for(var i = 1; i < openList.length; i++)
            {
                if(openList[i].FCost() <= currNode.FCost() && openList[i].hCost < currNode.hCost)
                {
                    currNode = openList[i];
                    currNodeID = i;
                }
            }

            openList.splice(currNodeID);
            closedList.push(currNode);

            if(currNode == targetNode)
            {
                this.GetFinalPath(startNode, targetNode);
                finalPathFound = true;
            }

            var neighbourNodes = this.grid.GetNeighbourNode(currNode);

            for(var i = 0; i < neighbourNodes.length; i++)
            {
                if(neighbourNodes[i].IsWall || closedList.includes(neighbourNodes[i]))
                {
                    continue;
                }

                var moveCost = currNode.gCost + this.GetManhattenDistance(currNode, neighbourNodes[i]);

                if(moveCost < neighbourNodes[i].gCost || !openList.includes(neighbourNodes[i]))
                {
                    neighbourNodes[i].gCost = moveCost;
                    neighbourNodes[i].hCost = this.GetManhattenDistance(neighbourNodes[i], targetNode);
                    neighbourNodes[i].parent = currNode;

                    if(!openList.includes(neighbourNodes[i]))
                    {
                        openList.push(neighbourNodes[i]);
                    }
                }
            }



        }
    }

    GetFinalPath(a_startNode, a_targetNode)
    {
        var finalPath = [];
        var currNode = a_targetNode;

        while(currNode != a_startNode)
        {
            finalPath.push(currNode);
            currNode = currNode.parent;
        }

        this.grid.finalPath = finalPath;
    }

    GetManhattenDistance(nodeA, nodeB)
    {
        var ix = Math.abs(nodeA.gridX - nodeB.gridX);
        var iy = Math.abs(nodeA.gridY - nodeB.gridY);

        return ix + iy;

    }
}