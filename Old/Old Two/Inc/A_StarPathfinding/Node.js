class Node_P
{
    constructor(IsWall, a_Pos, gridX, gridY)
    {
        this.IsWall = IsWall;       //Bool
        this.Position = a_Pos;      //Vector2
        this.gridX = gridX;         //Grid x ID
        this.gridY = gridY;         //Grid y ID

        this.parent = null;         //Stores the parent node when set.

        this.gCost = 0;             //Stores the cost to move to a neighbouring node.
        this.hCost = 0;             //Stores the distance to the target.
    }

    //Return the combined g and h cost.
    FCost()
    {
        return (this.gCost + this.hCost);
    }
}