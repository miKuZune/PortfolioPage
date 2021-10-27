class Pathfinding
{
    //Used when creating a pathfinding object.
    constructor(newGrid, newStartPos, newTargetPos)
    {
        this.grid = newGrid;
        this.startPos = newStartPos;
        this.targetPos = newTargetPos;
    }

    //Main method of this class which does the A* pathfinding.
    FindPath(startNodeID, targetNodeID)
    {
        //The array ID's of the start and target nodes.
        var startNode = this.grid.grid[startNodeID.x][startNodeID.y];
        var targetNode = this.grid.grid[targetNodeID.x][targetNodeID.y];

        var openList = [];      //Used to check nodes near the current node to see if they are in the direction of the target node.
        var closedList = [];    //Used to store nodes that have already been checked.


        openList.push(startNode);   //Add the start node to the openlist to kick off the search.

        while(openList.length > 0)
        {
            var currNode = openList[0]; //Stores the current node being checked this iteration.
            var currNodeID = 0;         //Stores the ID of the current node being checked so it can be taken off the openlist.

            //Checks if there are any other nodes on the open list which are closer to the target.
            for(var i = 1; i < openList.length; i++)
            {
                if(openList[i].FCost() <= currNode.FCost() && openList[i].hCost < currNode.hCost)
                {
                    currNode = openList[i];
                    currNodeID = i;
                }
            }
            //Take the current node off the open list and add it to the closed list.
            openList.splice(currNodeID);
            closedList.push(currNode);

            //Check if the current node being checked has reached the target node.
            if(currNode == targetNode)
            {
                this.GetFinalPath(startNode, targetNode);
            }

            var neighbourNodes = this.grid.GetNeighbourNode(currNode);  //Get all the neighbouring nodes of the current node.

            //Go through each of the neighbour nodes.
            for(var i = 0; i < neighbourNodes.length; i++)
            {
                //Check if the node is valid for checking.
                if(neighbourNodes[i].IsWall || closedList.includes(neighbourNodes[i]))
                {
                    continue;
                }

                var moveCost = currNode.gCost + this.GetManhattenDistance(currNode, neighbourNodes[i]);     //Calculate the cost to move from the current tile to the neighbouring tile.

                if(moveCost < neighbourNodes[i].gCost || !openList.includes(neighbourNodes[i]))
                {
                    //Set up the variables of the neighbour node.
                    neighbourNodes[i].gCost = moveCost;
                    neighbourNodes[i].hCost = this.GetManhattenDistance(neighbourNodes[i], targetNode);
                    neighbourNodes[i].parent = currNode;
                    //Check that the neighbour node is not already on the open list.
                    if(!openList.includes(neighbourNodes[i]))
                    {
                        openList.push(neighbourNodes[i]);
                    }
                }
            }
        }
    }

    //Uses the parent of each node to make a list of each node from target to start.
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
        //
        //For reference:
        // http://artis.imag.fr/~Xavier.Decoret/resources/maths/manhattan/html/
        //

        var ix = Math.abs(nodeA.gridX - nodeB.gridX);
        var iy = Math.abs(nodeA.gridY - nodeB.gridY);

        return ix + iy;

    }
}