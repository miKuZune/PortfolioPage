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

        //Create a moving gameobject
        var vec = new Vector2(10,10);
        MovingGameOBJ = new GameObject(new Vector2(areaStartPos,15), vec);

        //Create a list of gameobjects
        var numOfGameObjects = 3;
        GameObjList = [new GameObject(null,null)];

        for(var i = 0; i < numOfGameObjects; i++)
        {
            GameObjList[i] = (new GameObject(new Vector2(areaStartPos + ((i + 1) * 70), Math.random() * 15), new Vector2(10,10)));
        }
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

            MovingGameOBJ.Translate(new Vector2(1,0));

            //Draw the list of game objects
            ctx.fillStyle = 'rgba(0,255,0,255)';
            for(var i = 0; i < GameObjList.length; i++)
            {
                ctx.fillRect(GameObjList[i].position.x, GameObjList[i].position.y, GameObjList[i].size.x, GameObjList[i].size.y);
            }

            ctx.fillStyle = 'rgba(0,255,0,255)';
            ctx.fillRect(MovingGameOBJ.position.x, MovingGameOBJ.position.y, MovingGameOBJ.size.x,MovingGameOBJ.size.y);

            //Checks if the moving gameobject has collided with anything.
            for(var i = 0; i < GameObjList.length; i++)
            {
                if(MovingGameOBJ.Collided(GameObjList[i]))
                {
                    console.log("Colliding with " + GameObjList[i]);
                }
            }


        }, 17);
    }
}
BoidGameInst = new BoidGame();
//Global variables - accessible at any point through-out any script.
var areaSize;
var areaStartPos;

var MovingGameOBJ;
var GameObjList;