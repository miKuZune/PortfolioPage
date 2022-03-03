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


        this.gameState = "start";

        this.score = 0;
        this.scorePerKill = 10;

        //Define these variables as arrays.
        GameObjList = [];
        BoidList = [new Boid()];

        //Create the player
        var playerSize = new Vector2(40,40);
        var playerPos = new Vector2(areaStartPos + (areaSize / 2), areaSize - playerSize.y - 10);

        PlayerObj = new GameObject(playerPos, playerSize);

		this.timer = 0;
    }

    CreateBullet(vec)
    {
        //Create a gameobject to be used in rendering and collision.
        var BulletOBJ = new GameObject(new Vector2(vec.x, vec.y), new Vector2(5,10), "Bullet");
        BulletOBJ.velocity = new Vector2(0,-5);

        //Check if the list of bullets has been created yet.
        if(BulletList == undefined)
        {
            //If not create the list with a singular new bullet
            BulletList = [new Bullet(BulletOBJ)];
            GameObjList[GameObjList.length] = BulletList[0].obj;
        }else{
            //Otherwise just add a new bullet to the list.
            BulletList[BulletList.length] = new Bullet(BulletOBJ);
            GameObjList[GameObjList.length] = BulletList[BulletList.length - 1].obj;
        }


        BulletList[BulletList.length] = new Bullet(BulletOBJ);
        GameObjList[GameObjList.length] = BulletList[BulletList.length - 1].obj;
    }

    Start(ctx)
    {
        ctx.font = "40px Consolas";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Boid Invaders", areaStartPos + (areaSize / 2),areaSize * 0.1);

        ctx.textAlign= "left";
        ctx.font = "25px Consolas";
        ctx.fillText("Controls:", areaStartPos + (areaSize * 0.35),areaSize * 0.3);

        ctx.font = "20px Consolas";
        ctx.fillText("A/D - move left and right", areaStartPos + (areaSize * 0.38),areaSize * 0.4);

        ctx.fillText("Spacebar - shoot", areaStartPos + (areaSize * 0.38),areaSize * 0.48);

        ctx.fillText("Press Spacebar to start", areaStartPos + (areaSize * 0.35),areaSize * 0.9);

        if(spaceDown && this.timer > 60)
        {
            this.gameState = "play";
            spaceDown = false;
            this.score = 0;

            //Add Boids
            BoidManagerInst.CreateBoids();
			this.timer = 0;
        }
		
		this.timer++;

        window.addEventListener("keypress",onKeyDown);
    }

    Play(ctx)
    {
        if(startBoidNum != 0)
        {
            //Handle the boids
            for(var i = 0; i < BoidList.length; i++)
            {
                BoidList[i].Flock();
                BoidList[i].owner.MoveWithVelocity();
            }
        }
        //Move the bullets by their velocity.
        if(BulletList != undefined)
        {
            for(var i = 0; i < BulletList.length; i++)
            {
                BulletList[i].obj.MoveWithVelocity();
                BulletList[i].Execute(BoidList);
            }
        }




        //Checks colliders
        if(BulletList != undefined)
        {
            //Go through each rendered gameobject.
            for(var i = 0; i < GameObjList.length; i++)
            {
                //Go through the bullets.
                for(var j = 0; j < BulletList.length; j++)
                {
                    //Check if the bullets have collided with objects that are not themselves or other bullets.
                    if(BulletList[j].obj.Collided(GameObjList[i]) && GameObjList[i] != BulletList[j].obj && GameObjList[i].tag != "Bullet")
                    {
                        //Goes through and finds the position of the bullet in the rendering array.
                        for(var k = 0; k < GameObjList.length; k++)
                        {
                            if(GameObjList[k] == BulletList[j].obj)
                            {
                                //Remove the Bullet from the Rendering list and from the bullet list.
                                GameObjList.splice(k,1);
                                BulletList.splice(j,1);
                                //Remove the Boid from rendering list.
                                GameObjList.splice(i,1);

                                this.score += this.scorePerKill;
                            }
                        }
                    }
                }
            }
        }


        //Change swarm goal pos randomly
        if(Math.random() * 50 <= 1)
        {
            BoidManagerInst.ChangeGoalPos();
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
		


        //Validation

        //Check if Gameobjects exceeds play area
		//Also if the GameObject is close to the wall it will begin to push them away from the wall
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
                if(GameObjList[i].tag == "Bullet"){GameObjList.splice(i,1);}
            }
			
			//Check if they are close to the walls.
			if(GameObjList[i].position.x > areaStartPos + areaSize - GameObjList[i].size.x * 0.9)
			{
				var force = new Vector2(-10,0);
				GameObjList[i].AddForce(force, 10);
			}else if(GameObjList[i].position.x < areaStartPos * 0.9)
			{
				var force = new Vector2(-10,0);
				GameObjList[i].AddForce(force, 10);
			}
			
			if(GameObjList[i].position.y > areaSize * 0.7 && GameObjList[i].tag != "Bullet")
            {
                var force = new Vector2(0,-10);
				GameObjList[i].AddForce(force, 10);
            }
            else if(GameObjList[i].position.y < 0 + areaSize * 0.1 && GameObjList[i].tag != "Bullet")
            {
                var force = new Vector2(0,10);
				GameObjList[i].AddForce(force, 10);
            }
			
        }

        //Check if the player exceeds bounds
        if(PlayerObj.position.x > areaStartPos + areaSize - PlayerObj.size.x)
        {
            PlayerObj.position.x = areaStartPos + areaSize - PlayerObj.size.x;
        }
        //Check if they have gone beyond the left side of the play area.
        if(PlayerObj.position.x < areaStartPos)
        {
            PlayerObj.position.x = areaStartPos;
        }



        //Draw the list of game objects
        //Needs to be called last so that any changes made to positions (such as keeping them inside the play area) will be drawn as applied.
        ctx.fillStyle = 'rgba(0,255,0,255)';

        for(var i = 0; i < GameObjList.length; i++)
        {
            if(GameObjList[i].tag == "Bullet"){ctx.fillStyle = 'rgba(255,0,0,255)';}
            else{ctx.fillStyle = 'rgba(0,255,0,255)';}

            ctx.fillRect(GameObjList[i].position.x, GameObjList[i].position.y, GameObjList[i].size.x, GameObjList[i].size.y);
        }
        //Draw UI
        ctx.font = "20px Consolas";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + this.score, areaStartPos,20);




        //Check for end game state
        if(this.score / 10 >= startBoidNum)
        {
            this.gameState = "end";
        }

        ctx.fillStyle = 'rgba(218,146,229,255)';
        ctx.fillRect(PlayerObj.position.x, PlayerObj.position.y, PlayerObj.size.x, PlayerObj.size.y);

        window.addEventListener("keypress",onKeyDown);
        window.addEventListener("keyup", onKeyUp);

        bulletCD -= 0.17;
    }

    End(ctx)
    {
        ctx.font = "40px Consolas";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER!" ,(areaStartPos + areaSize/2), areaSize * 0.3 );

        ctx.font = "25px Consolas";
        ctx.fillText("Your score: " + this.score, (areaStartPos + areaSize/2), areaSize * 0.5);

        ctx.fillText("Press Space to continue", (areaStartPos + areaSize/2), areaSize * 0.9);

        if(spaceDown && this.timer > 60)
        {
            this.gameState = "start";
            spaceDown = false;
			
			this.timer = 0;
        }
		
		this.timer++;

        window.addEventListener("keypress",onKeyDown);
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

            switch(BoidGameInst.gameState)
            {
                case "start":
                        BoidGameInst.Start(ctx);
                    break;
                case "play":
                        BoidGameInst.Play(ctx);
                    break;
                case"end":
                        BoidGameInst.End(ctx);
                    break;
            }

        }, 17);
    }
}


BoidGameInst = new BoidGame();
//Global variables - accessible at any point from any script.
var areaSize;
var areaStartPos;

var PlayerObj;
var GameObjList;
var BoidList;
var BulletList;

var moveSpeed = 5;
var playerX_Vel = 0;

var bulletCD = 0;


//Probably shouldn't set this to more than like 2500
var startBoidNum = 150;

var goalWeight = 4;
var aliWeight = 1;
var cohWeight = 2;
var avoWeight = 2.2;

//Input variables

var aDown = false;
var dDown = false;
var spaceDown = false;

function onKeyDown(e)
{
    if(e.key == 'a')
    {
        aDown = true;
    }else if(e.key == 'd')
    {
        dDown = true;
    }

    if(e.key == ' ')
    {
        spaceDown = true;
        if(bulletCD <= 0)
        {
            BoidGameInst.CreateBullet(new Vector2(PlayerObj.position.x + (PlayerObj.size.x / 2), 600));
            bulletCD = 0.5;
        }
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

    if(e.key == ' ')
    {
        spaceDown = false;
    }
}
