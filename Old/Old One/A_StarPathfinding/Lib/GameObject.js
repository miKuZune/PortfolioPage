class GameObject
{
    constructor(position, size, tag)
    {
        this.position = position;
        this.size = size;

        this.velocity = new Vector2(0,0);

        this.tag = tag;
    }

    Translate(vec2)
    {
        this.position.x = this.position.x +  vec2.x;
        this.position.y = this.position.y + vec2.y;
    }

    AddForce(force, maxMoveSpeed)
    {
        this.velocity.x += force.x;
        this.velocity.y += force.y;

        if(this.velocity.Length() >= maxMoveSpeed)
        {
            this.velocity.x /= maxMoveSpeed;
            this.velocity.y /= maxMoveSpeed;

        }

    }


    MoveWithVelocity()
    {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
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