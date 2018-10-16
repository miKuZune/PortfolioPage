class GameObject
{
    constructor(position, size)
    {
        this.position = position;
        this.size = size;
    }

    Translate(vec2)
    {
        this.position.x = this.position.x +  vec2.x;
        this.position.y = this.position.y + vec2.y;
    }

    Collided(Obj)
    {
        var xPosMin = this.position.x; //X Pos closest to the left side of the screen.
        var xPosMax = this.position.x + this.size.x; //X Pos closest to the right side.
        var yPosMin = this.position.y; //Y Pos closest to the top of the screen
        var yPosMax = this.position.y + this.size.y; //Y Pos closest to the bottom of the screen.

        //Array inorder - Top left , bottom left, top right, bottom right
        var cornerPositions = [(new Vector2(xPosMin, yPosMin)), (new Vector2(xPosMin,yPosMax)), (new Vector2(xPosMax,yPosMin)),(new Vector2(xPosMax,yPosMax))];

        for(var i = 0; i < cornerPositions.length; i++ )
        {
            if(cornerPositions[i].x >= Obj.position.x && cornerPositions[i].x <= Obj.position.x + Obj.size.x)
            {
                if(cornerPositions[i].y >= Obj.position.y && cornerPositions[i].y <= Obj.position.y + Obj.size.y)
                {
                    return true;
                }
            }
        }


        return false;
    }


}