class Node
{
    constructor()
    {
        this.h = 0;
        this.parent = null;

        this.filled = false;

        this.x = 0;
        this.y = 0;

        this.dir = "";
    }

    SetParent(parent)
    {
        this.parent = parent;
    }

    SetH(h)
    {
        this.h = h;
    }

    SetFilled()
    {
        this.filled = true;
    }

    SetX(x)
    {
        this.x = x;
    }

    SetY(y)
    {
        this.y = y;
    }

    SetDir(dir)
    {
        this.dir = dir;
    }
}