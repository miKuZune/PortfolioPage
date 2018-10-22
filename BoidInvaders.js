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
        GameObjList = [];
        BoidList = [new Boid()];

        /*for(var i = 0; i < numOfGameObjects; i++)
        {
            GameObjList[i] = (new GameObject(new Vector2(areaStartPos + Math.random() *  areaSize, Math.random() * areaSize), new Vector2(10,10)));
        }*/

        //Create the player
        var playerSize = new Vector2(40,40);
        var playerPos = new Vector2(areaStartPos + (areaSize / 2), areaSize - playerSize.y - 10);

        PlayerObj = new GameObject(playerPos, playerSize);


        //Add Boids
        BoidManagerInst.CreateBoids();
    }



    Run()
    {
        this.Init();

		//Operates as the game loop
		//Is called every 17 milliseconds.
		//Which means this renders at around 60 frames a second.
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
                }
            }

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
			//Sets them to be within the play area if they have left it.

            for(var i = 0; i < GameObjList.length; i++)
            {
				//Check if they have gone beyond the right side of the play area.
                if(GameObjList[i].position.x > areaStartPos + areaSize - GameObjList[i].size.x)
                {
                    GameObjList[i].position.x = areaStartPos + areaSize - GameObjList[i].size.x;
                }
				//Check if they have gone beyond the left side of the play area.
                if(GameObjList[i].position.x < areaStartPos)
                {
                    GameObjList[i].position.x = areaStartPos;
                }
				//Check if they have gone beneath the play area.
				//By using times 0.8 we give the player and the agents their own separate zones within the play area.
				//This will ensure that the play is never struggling to shoot an enemy because it has gone beneath him and they can't shoot down at them.
                if(GameObjList[i].position.y > areaSize * 0.8)
                {
                    GameObjList[i].position.y = areaSize * 0.8;
                }
				//Check if they have gone above the play area.
                if(GameObjList[i].position.y < 0)
                {
                    GameObjList[i].position.y = 0;
                }
            }
			
			
			
			//Draw the list of game objects
			//Needs to be called last so that any changes made to positions (such as keeping them inside the play area) will be drawn as applied.
            ctx.fillStyle = 'rgba(0,255,0,255)';

            for(var i = 0; i < GameObjList.length; i++)
            {				
                ctx.fillRect(GameObjList[i].position.x, GameObjList[i].position.y, GameObjList[i].size.x, GameObjList[i].size.y);
            }
			
			//Handle player movement based on current inputs
			if(aDown)
			{
				playerX_Vel = -moveSpeed;
			}else if(dDown)
			{
				playerX_Vel = moveSpeed;
			}else
			{
				playerX_Vel = 0;
			}
            //Draw the player.
            PlayerObj.Translate(new Vector2(playerX_Vel,0));

            ctx.fillStyle = 'rgba(218,146,229,255)';
            ctx.fillRect(PlayerObj.position.x, PlayerObj.position.y, PlayerObj.size.x, PlayerObj.size.y);

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
var avoWeight = 2.5;

//Input variables

var aDown = false;
var dDown = false;

function onKeyDown(e)
{
    if(e.key == 'a')
    {
        aDown = true;
    }else if(e.key == 'd')
    {
        dDown = true;
    }
}

function onKeyUp(e)
{
    if(e.key == 'a')
	{
		aDown = false;
	}
	
	if(e.key == 'd')
	{
		dDown = false;
	}
}
