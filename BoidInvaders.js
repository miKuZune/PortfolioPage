class BoidGame
{
    Init()
    {
        //Set the size of the playable area.
        areaSize = 600;
        //Set the starting x position of the playable area.
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        //Calculates the middle of the browser and puts the playable area there.
        areaStartPos = (window.innerWidth / 2) - (areaSize / 2);

        //Create a list of gameobjects
        var numOfGameObjects = 3;
        //Define these variables as arrays.
        GameObjList = [new GameObject(null,null)];
        BoidList = [new Boid()];

        for(var i = 0; i < numOfGameObjects; i++)
        {
            GameObjList[i] = (new GameObject(new Vector2(areaStartPos + Math.random() *  areaSize, Math.random() * areaSize), new Vector2(10,10)));
        }

        //Create the player
        var playerSize = new Vector2(40,40);
        var playerPos = new Vector2(areaStartPos + (areaSize / 2), areaSize - playerSize.y - 10);

        PlayerObj = new GameObject(playerPos, playerSize);


        //Add boids
        BoidManagerInst.CreateBoids();

    }



    Run()
    {
        this.Init();

        setInterval(function () {
            //Draw the canvas onto the screen.
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");

            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            //Fill in a background for the whole page.
            ctx.fillStyle = 'rgba(32,32,32,255)';
            ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
            //Fill in the playable area.
            ctx.fillStyle = 'rgba(255,255,255,255)';
            ctx.fillRect(areaStartPos,0,this.areaSize,this.areaSize);


            if(startBoidNum != 0)
            {
                //Handle the boids
                for(var i = 0; i < BoidList.length; i++)
                {

                    BoidList[i].Flock();
                    BoidList[i].owner.MoveWithVelocity();
                    if(i == 6)
                    {
                        //console.log(BoidList[i].velocity);
                    }
                }
            }


            //Draw the list of game objects
            ctx.fillStyle = 'rgba(0,255,0,255)';

            for(var i = 0; i < GameObjList.length; i++)
            {
				if(i == 6){ctx.fillStyle = 'rgba(255,0,0,255)';}
				else{ctx.fillStyle = 'rgba(0,255,0,255)';}
				
                ctx.fillRect(GameObjList[i].position.x, GameObjList[i].position.y, GameObjList[i].size.x, GameObjList[i].size.y);
            }
            //Draw the player.
            PlayerObj.Translate(new Vector2(playerX_Vel,0));

            ctx.fillStyle = 'rgba(218,146,229,255)';
            ctx.fillRect(PlayerObj.position.x, PlayerObj.position.y, PlayerObj.size.x, PlayerObj.size.y);

            //Checks colliders
            for(var i = 0; i < GameObjList.length; i++)
            {

            }

            //Change swarm goal pos randomly
            if(Math.random() * 100 <= 1)
            {
                BoidManagerInst.ChangeGoalPos();
            }


            //Validation

            //Check if Gameobjects exceeds play area


            for(var i = 0; i < GameObjList.length; i++)
            {
                if(GameObjList[i].position.x > areaStartPos + areaSize - GameObjList[i].size.x)
                {
                    GameObjList[i].position.x = areaStartPos + areaSize - GameObjList[i].size.x;
                }
                if(GameObjList[i].position.x < areaStartPos)
                {
                    GameObjList[i].position.x = areaStartPos;
                }

                if(GameObjList[i].position.y > areaSize - GameObjList[i].size.y)
                {
                    GameObjList[i].position.y = areaSize - GameObjList[i].size.y;
                }
                if(GameObjList[i].position.y < 0)
                {
                    GameObjList[i].position.y = 0;
                }
            }



            window.addEventListener("keypress",onKeyDown);
            window.addEventListener("keyup", onKeyUp);

        }, 17);
    }
}


BoidGameInst = new BoidGame();
//Global variables - accessible at any point through-out any script.
var areaSize;
var areaStartPos;

var PlayerObj;
var GameObjList;
var BoidList;

var moveSpeed = 5;
var playerX_Vel = 0;

var keysPressed = 0;

//Probably shouldn't set this to more than like 2500
var startBoidNum = 300;

var goalWeight = 3;
var aliWeight = 1;
var cohWeight = 2;
var avoWeight = 2;

function onKeyDown(e)
{
    if(e.key == 'a')
    {
        playerX_Vel = -moveSpeed;
        keysPressed++;
    }else if(e.key == 'd')
    {
        playerX_Vel = moveSpeed;
        keysPressed++;
    }

    if(e.key == 'q')
    {
        for(var i = 0; i < 3; i++)
        {
            var targetDir = new Vector2(GameObjList[i].position.x - BoidManagerInst.goal.x, GameObjList[i].position.y - BoidManagerInst.goal.y);

            targetDir.Normalize();

            targetDir.x = -targetDir.x;
            targetDir.y = -targetDir.y;

            GameObjList[i].AddForce(targetDir);
        }
    }

}

function onKeyUp(e)
{
    if(e.key == 'a' || e.key == 'd')
    {
        keysPressed--;
    }

    if(keysPressed >= 2){keysPressed = 0;}
    else if(keysPressed < 0){keysPressed = 0;}

    if(keysPressed == 0)
    {
        playerX_Vel = 0;
    }
}
