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

        //Create walls in the level.

        this.wallIDs = [];
        this.wallNumber = Math.round(Math.random()*15) + 10;
        for(var i = 0; i < this.wallNumber; i++)
        {
            var newVec = this.GetRandomID();
            this.wallIDs[i] = newVec;
        }

        this.gridInst.AddWalls(this.wallIDs);

        //Create an object for pathfinding.

        this.pathfinder = new Pathfinding(this.gridInst, this.gridInst.grid[this.startID.x][this.startID.y].Position, this.gridInst.grid[this.targetID.x][this.targetID.y].Position );
        this.pathfinder.FindPath(this.startID, this.targetID);


        //Snake's information
        this.snakeVel = new Vector2(0,1);


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


            //Snake gameplay

            //Decide direction.
            var path = ManagerInst.gridInst.finalPath;

            var dir = ManagerInst.GetDirection(ManagerInst.gridInst.grid[ManagerInst.startID.x][ManagerInst.startID.y], path[path.length-1]);
            ManagerInst.snakeVel = ManagerInst.GetVelocity(dir);

            //Move by snake's velocity.
            ManagerInst.startID.x += ManagerInst.snakeVel.x;
            ManagerInst.startID.y += ManagerInst.snakeVel.y;

            //Check if snake and target are overlapping
            if(ManagerInst.startID.x == ManagerInst.targetID.x && ManagerInst.startID.y == ManagerInst.targetID.y )
            {
                ManagerInst.targetID = ManagerInst.GetRandomID();
            }





            //DRAW TO THE CANVAS
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
            //USE A* TO FIND THE PATH.
            //ManagerInst.gridInst.AddWalls(ManagerInst.wallIDs);
            ManagerInst.pathfinder.FindPath(ManagerInst.startID, ManagerInst.targetID);
            for(var i = 0;i < ManagerInst.gridInst.finalPath.length; i++)
            {
                var pathWorldPos = ManagerInst.gridInst.finalPath[i].Position;

                ctx.fillRect(pathWorldPos.x, pathWorldPos.y, ManagerInst.objSize,ManagerInst.objSize);
            }

            //Draw walls
            ctx.fillStyle = 'rgba(255,255,41,255)';
            for(var i = 0; i < ManagerInst.wallIDs.length; i++)
            {
                var wallWorldPos = ManagerInst.gridInst.grid[ManagerInst.wallIDs[i].x][ManagerInst.wallIDs[i].y].Position;
                ctx.fillRect(wallWorldPos.x,wallWorldPos.y, ManagerInst.objSize,ManagerInst.objSize);
            }

            //Draw the target pos

            ctx.fillStyle = 'rgba(255,0,0,255)';
            var targetWorldPos = ManagerInst.gridInst.grid[ManagerInst.targetID.x][ManagerInst.targetID.y].Position;
            ctx.fillRect(targetWorldPos.x,targetWorldPos.y, ManagerInst.objSize, ManagerInst.objSize);



        }, 400);
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

    GetDirection(currNode, nextNode)
    {
        if(currNode == undefined || nextNode == undefined)
        {
            return;
        }
        var dir = "";

        if(currNode.Position.x != nextNode.Position.x)
        {
            if(nextNode.Position.x > currNode.Position.x) {dir = "right";}
            else if(nextNode.Position.x < currNode.Position.x) {dir = "left";}
        }
        else if(currNode.Position.y != nextNode.Position.y)
        {
            if(nextNode.Position.y > currNode.Position.y) {dir = "down";}
            else if(nextNode.Position.y < currNode.Position.y) {dir = "up";}
        }


        return dir;
    }

    GetVelocity(dir)
    {
        if(dir == undefined)
        {
            return this.snakeVel;
        }

        var vel;

        switch (dir)
        {
            case "left":
                vel = new Vector2(-1,0);
                break;
            case "right":
                vel = new Vector2(1,0);
                break;
            case "up":
                vel = new Vector2(0,-1);
                break;
            case "down":
                vel = new Vector2(0,1);
                break;
        }

        return vel;
    }
}

ManagerInst = new Manager();