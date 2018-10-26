class Boid
{
    constructor(owner)
    {
        this.owner = owner;
        this.velocity = new Vector2(Math.random(),Math.random());

        this.neighbourDist = 250;
        this.moveSpeed = (Math.random() * 6) + 3;
		
		this.tickRate = (Math.random() * 3) + 3;
		
    }

    MoveByVelocity()
    {
        this.owner.Translate(this.velocity);
    }

    Seek(targetPos)
    {
        var x = targetPos.x - this.owner.position.x;
        var y = targetPos.y - this.owner.position.y;

        return (new Vector2(x,y));
    }

    //Find the average direction of the group
    Align()
    {
        var sum = new Vector2(0,0);
        var count = 0;

        for(var i = 0; i < BoidList.length; i++)
        {
            if(BoidList[i].owner != this.owner)
            {
                var d = this.owner.position.Distance(BoidList[i].owner.position);

                if(d < this.neighbourDist)
                {
                    var newVec = sum;
                    newVec.x += BoidList[i].velocity.x;
                    newVec.y += BoidList[i].velocity.y;
                    sum = newVec;
                    count++;

                }
            }
        }

        if(count > 0)
        {
            sum.x /= count;
            sum.y /= count;

            var steer = new Vector2(0,0);
            steer.x = sum.x - this.velocity.x;
            steer.y = sum.y - this.velocity.y;
            return steer;
        }

        return new Vector2(0,0);
    }

    //Find the average position of the group.
    Cohesion()
    {
        var sum = new Vector2(0,0);
        var count = 0;

        for(var i = 0; i < BoidList.length; i++)
        {
            if(BoidList[i].owner != this.owner)
            {
                var d = this.owner.position.Distance(BoidList[i].owner.position);
                if(d < this.neighbourDist)
                {
                    sum.x += BoidList[i].owner.position.x;
                    sum.y += BoidList[i].owner.position.y;
                    count++;
                }
            }
        }
        if(count > 0)
        {
            sum.x /= count;
            sum.y /= count;

            return this.Seek(sum);
        }
        return new Vector2(0,0);
    }

    //Find the average position to move to in order to avoid being too close to others in the group.
    Avoid()
    {
        var sum = new Vector2(0,0);
        var count = 0;

        for(var i = 0; i < BoidList.length; i++)
        {
            if(BoidList[i].owner != this.owner)
            {
                var d = this.owner.position.Distance(BoidList[i].owner.position);
                if(d < this.neighbourDist * 0.6)
                {
                    sum.x = sum.x + (this.owner.position.x - BoidList[i].owner.position.x);
                    sum.y = sum.y + (this.owner.position.y - BoidList[i].owner.position.y);

                    count++;
                }
            }
        }
        if(count > 0)
        {
            sum.x /= count;
            sum.y /= count;

            return sum;
        }

        return new Vector2(0,0);
    }

    Flock()
    {
		
        if(Math.random() * 7 <= 1)
        {
            var ali = this.Align();
            var coh = this.Cohesion();
            var avo = this.Avoid();
            var goalSeeked = this.Seek(BoidManagerInst.goal);

            goalSeeked.Normalize();

            this.velocity.x = (goalSeeked.x * goalWeight) + (ali.x * aliWeight)  + (coh.x * cohWeight) + (avo.x * avoWeight);
            this.velocity.y = (goalSeeked.y* goalWeight) + (ali.y * aliWeight) + (coh.y * cohWeight) + (avo.y * avoWeight) ;
        }

        this.velocity.Normalize();

        this.owner.AddForce(this.velocity, this.moveSpeed);
    }
}