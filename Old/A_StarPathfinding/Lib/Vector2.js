class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;

        if (x != undefined) {
            this.x = x;
        }

        if (y != undefined) {
            this.y = y;
        }
    }

    Set(vec)
    {
        this.x = vec.x;
        this.y = vec.y;
    }

    Length()
    {
        return Math.sqrt((this.x*this.x) + (this.y*this.y));
    }

    Distance(vec)
    {
        return Math.sqrt(Math.pow(this.x - vec.x,2) + Math.pow(this.y - vec.y,2));
    }

    Normalize()
    {
        var length = this.Length();

        this.x/= length;
        this.y/= length;
    }

    static RotateTowards(currDir, targetDir, step)
    {
        var newDir = new Vector2(0,0);

        newDir.x = currDir.x + (targetDir.x * step);
        newDir.y = currDir.y + (targetDir.y * step);

        return newDir;
    }

    static Dot(v0,v1)
    {
        return (v0.x * v1.x) + (v0.y * v1.y);
    }

    toString()
    {
        return " " + this.x + ":" + this.y;
    }
}