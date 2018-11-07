class Manager
{
    Init()
    {
        this.areaSize = 600;

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        this.areaStartPos = (window.innerWidth / 2) - (this.areaSize/2);

        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        //Create the grid.
        this.gridInst = new Grid();
        this.gridInst.Init(this.areaSize,this.areaStartPos);



        //Create the starting and target positions
        this.startID = this.GetRandomID();
        this.targetID = this.GetRandomID();
        //Define how big the representation of objects is.
        this.objSize = (this.gridInst.nodeRadius * 2) - 1;

        //Create an object for pathfinding.

        this.pathfinder = new Pathfinding(this.gridInst, this.gridInst.grid[this.startID.x][this.startID.y].Position, this.gridInst.grid[this.targetID.x][this.targetID.y].Position );
        this.pathfinder.FindPath(this.startID, this.targetID);
        
    }

    Run()
    {
        this.Init();

        setInterval(function()
        {
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");

            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;

            ctx.fillStyle = 'rgba(32,32,32,255)';
            ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

            ctx.fillStyle = 'rgba(255,255,255,255)';
            ctx.fillRect(ManagerInst.areaStartPos, 0, ManagerInst.areaSize,ManagerInst.areaSize);

            ctx.fillStyle = 'rgba(0,0,255,255)';


            //Draw the grid.
            for(var i = 0; i < ManagerInst.gridInst.gridSizeY; i++)
            {
                for(var j = 0; j < ManagerInst.gridInst.gridSizeX; j++)
                {
                    ctx.fillRect(ManagerInst.gridInst.grid[i][j].Position.x,ManagerInst.gridInst.grid[i][j].Position.y, ManagerInst.objSize,ManagerInst.objSize);
                }
            }

            //Draw the start pos

            ctx.fillStyle = 'rgba(0,255,0,255)';
            var startWorldPos = ManagerInst.gridInst.grid[ManagerInst.startID.x][ManagerInst.startID.y].Position;
            ctx.fillRect(startWorldPos.x,startWorldPos.y, ManagerInst.objSize,ManagerInst.objSize);

            //Draw the path from start to target.
            ctx.fillStyle = 'rgba(0,255,255,255)';
            for(var i = 0;i < ManagerInst.gridInst.finalPath.length; i++)
            {
                var pathWorldPos = ManagerInst.gridInst.finalPath[i].Position;

                ctx.fillRect(pathWorldPos.x, pathWorldPos.y, ManagerInst.objSize,ManagerInst.objSize);
            }

            //Draw the target pos

            ctx.fillStyle = 'rgba(255,0,0,255)';
            var targetWorldPos = ManagerInst.gridInst.grid[ManagerInst.targetID.x][ManagerInst.targetID.y].Position;
            ctx.fillRect(targetWorldPos.x,targetWorldPos.y, ManagerInst.objSize, ManagerInst.objSize);


            ManagerInst.targetID =  ManagerInst.GetRandomID();
            ManagerInst.pathfinder.FindPath(ManagerInst.startID, ManagerInst.targetID);

        }, 250);
    }

    GetRandomID()
    {
        var newX = (Math.random() * this.gridInst.gridSizeX) - 1;
        var newY = (Math.random() * this.gridInst.gridSizeY) - 1;

        newX = Math.round(newX);
        newY = Math.round(newY);

        if(newX <0) {newX = 0;}
        if(newY <0){newY = 0;}

        var newVec = new Vector2(newX,newY);
        return newVec;
    }
}

ManagerInst = new Manager();