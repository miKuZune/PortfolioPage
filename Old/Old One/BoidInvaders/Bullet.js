class Bullet
{
    constructor(obj)
    {
        this.obj = obj;
        this.ySpeed = 5;

        this.avoidDist = areaSize * 0.05;
    }

    Execute(boids)
    {
        for(var i = 0; i < boids.length; i++)
        {
            var dist = Vector2.Distance(this.obj.position, boids[i].owner.position);
            if(dist <= this.avoidDist)
            {
                var force = new Vector2(boids[i].owner.position.x - this.obj.position.x, boids[i].owner.position.y - this.obj.position.y );

                boids[i].owner.AddForce(force, boids[i].moveSpeed);
            }
        }
    }
}