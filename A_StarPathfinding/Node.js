class Node_P
{
    constructor(IsWall, a_Pos, gridX, gridY)
    {
        this.IsWall = IsWall;
        this.Position = a_Pos;
        this.gridX = gridX;
        this.gridY = gridY;

        this.parent = null;

        this.gCost = 0;
        this.hCost = 0;
    }

    FCost()
    {
        return (this.gCost + this.hCost);
    }
}