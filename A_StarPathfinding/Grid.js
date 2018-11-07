class Grid
{
    constructor()
    {
        this.gridWorldSize = new Vector2(0,0);  //The size of the grid.
        this.nodeRadius = 15;
        this.distance = 0.0;


        this.grid = [];     //2d Array of the nodes on the grid.
        this.finalPath = [];  //Array to hold the path of nodes.

        this.nodeDiameter = 0;
        this.gridSizeX = 0;
        this.gridSizeY = 0;
    }

    Init(gridWorldSize, gridStartPos)
    {

        this.gridWorldSize = gridWorldSize;

        this.nodeDiameter = this.nodeRadius * 2;
        this.gridSizeX = gridWorldSize / this.nodeDiameter;
        this.gridSizeY = gridWorldSize / this.nodeDiameter;


        this.CreateGrid(new Vector2(gridStartPos,0));
    }


    CreateGrid(startVec)
    {
        var topLeft = startVec;     //Stores the top left area where the grid should start.
        this.grid = [];             //Create a grid array.

        //Go through the x length of the grid size
        for(var x = 0; x < this.gridSizeX; x++)
        {
            this.grid[x] = [];      //Create a second dimension/ column in this row of the array.
            for(var y = 0; y < this.gridSizeY; y++)
            {
                //Calculate the pixel position on screen.
                var worldPoint = new Vector2(topLeft.x + (x * this.nodeDiameter),topLeft.y + (y * this.nodeDiameter));
                //Store in arary.
                this.grid[x][y] = new Node_P(false, worldPoint,x,y);
            }
        }
    }

    //Go through a given array of wall IDs and change the appropraite nodes to be walls.
    AddWalls(walls)
    {
        for(var i = 0; i < walls.length; i++)
        {
            console.log(walls[i]);
            this.grid[walls[i].x][walls[i].y].IsWall = true;

        }
    }

    GetNeighbourNode(node)
    {
        var NeighbourNodes = [];    //Stores the list of neighbouring nodes.
        var xCheck;                 //Stores the x value to be checked.
        var yCheck;                 //Stores the y value to be checked.

        //Right side
        xCheck = node.gridX + 1;
        yCheck = node.gridY;

        if(xCheck >= 0 && xCheck < this.gridSizeX)
        {
            if(yCheck >= 0 && yCheck < this.gridSizeY)
            {
                NeighbourNodes.push(this.grid[xCheck][yCheck]);
            }
        }

        //Left side
        xCheck = node.gridX - 1;
        yCheck = node.gridY;

        if(xCheck >= 0 && xCheck < this.gridSizeX)
        {
            if(yCheck >= 0 && yCheck < this.gridSizeY)
            {
                NeighbourNodes.push(this.grid[xCheck][yCheck]);
            }
        }

        //Up side
        xCheck = node.gridX;
        yCheck = node.gridY - 1;

        if(xCheck >= 0 && xCheck < this.gridSizeX)
        {
            if(yCheck >= 0 && yCheck < this.gridSizeY)
            {
                NeighbourNodes.push(this.grid[xCheck][yCheck]);
            }
        }

        //Down side
        xCheck = node.gridX;
        yCheck = node.gridY + 1;

        if(xCheck >= 0 && xCheck < this.gridSizeX)
        {
            if(yCheck >= 0 && yCheck < this.gridSizeY)
            {
                NeighbourNodes.push(this.grid[xCheck][yCheck]);
            }
        }

        return NeighbourNodes;
    }
}