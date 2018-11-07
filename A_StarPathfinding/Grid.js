class Grid
{
    constructor()
    {
        this.wallClassifier;                    //How to find if a node is a wall or not.
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

        var topLeft = startVec;
        this.grid = [];

        for(var x = 0; x < this.gridSizeX; x++)
        {
            this.grid[x] = [];
            for(var y = 0; y < this.gridSizeY; y++)
            {
                var worldPoint = new Vector2(topLeft.x + (x * this.nodeDiameter),topLeft.y + (y * this.nodeDiameter));

                this.grid[x][y] = new Node_P(false, worldPoint,x,y);
            }
        }
    }

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
        var NeighbourNodes = [];
        var xCheck;
        var yCheck;

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

    NodeFromWorldPosition(a_WorldPos)
    {
        var xPos = ((a_WorldPos.x + this.gridWorldSize/2) / this.gridWorldSize);
        var yPos = ((a_WorldPos.y + this.gridWorldSize/2) / this.gridWorldSize);

        console.log((a_WorldPos + this.gridWorldSize ));

        //xPos = xPos.clamp(0,1);
        //yPos = yPos.clamp(0,1);

        var x = (this.gridSizeX - 1) * xPos;
        var y = (this.gridSizeY - 1) * yPos;



        return this.grid[x][y];
    }
}

Number.prototype.clamp = function(min,max)
{
    return Math.min(Math.max(this,min),max);
}