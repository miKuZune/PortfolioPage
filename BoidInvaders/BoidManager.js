class BoidManager
{
    CreateBoids()
    {
        var xOffset = 30;
        var yOffset = 80;
        var boidCount = 0;

        this.goal = new Vector2(areaStartPos + (areaSize/2),areaSize/2);

        //Create the boids
        for(var i = 0; i < startBoidNum; i++)
        {
            //Create a start pos for the Agent
            var pos = new Vector2(Math.random() * (areaSize - xOffset) + areaStartPos, Math.random() * (areaSize - yOffset));
            var size = new Vector2 (5,5);
            //Create the agent object
            var newObj = new GameObject(pos,size);
            //Add the agent to the Draw list.
            var count = GameObjList.length;
            GameObjList[count] = newObj;

            var newBoid = new Boid(newObj);
            BoidList[boidCount] = newBoid;
            boidCount++;
        }

    }

    ChangeGoalPos()
    {
        this.goal = new Vector2((Math.random() * areaSize * 0.8) + areaStartPos, Math.random() * areaSize * 0.8 );
    }

}
BoidManagerInst = new BoidManager();