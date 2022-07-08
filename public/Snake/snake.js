var updateTimer;
var canvas = document.getElementById("GameScreen");
var ctx = canvas.getContext("2d");

var highScore = 0;

var ang = 0;
var changeDir = 1;
var character = [[3,8],[2,8],[1,8]];


var playing = false;
var appleCoords;
var score = 0;
var pause = false;

var colors = ["blue","red","limegreen","white","teal","yellow","aqua","crimson","deeppink","orange"];

var snakenum = 2;
var snakeColor = colors[snakenum];

var applenum = 1;
var appleColor = colors[applenum];



function ChangeColor(x)
{
    switch(x)
    {
        case 0:
            if(snakenum == 9)
                snakenum = -1;
            snakeColor = colors[++snakenum];
            document.getElementById("snakeColor").innerHTML = "Change Snake Color - "+snakeColor;
            document.getElementById("snakeColor").style.background = snakeColor;
            break;
        case 1:
            if(applenum == 9)
                applenum = -1;
            appleColor = colors[++applenum];
            document.getElementById("appleColor").innerHTML = "Change Apple Color - "+appleColor;
            document.getElementById("appleColor").style.background = appleColor;
            break;
    }
}

async function GetHighScore()
{
    var temp = await getGameData("Serpent");
    if(temp != null)
    {
        highScore = temp;
        document.getElementById("Score").innerHTML = "High Score : " + highScore + " :: Score : "+score;
    }
    return temp;
}

GetHighScore();

function Start()
{
   if(!playing)
   {
    score = 0; document.getElementById("Score").innerHTML = "High Score : " + highScore + " :: Score : "+score;
    document.getElementById("GameOver").innerHTML = "---";
    document.getElementById('GameScreen').style.cursor = 'none';
    playing = true;    
    updateTimer = setInterval(Update,100);
    SpawnApple();
   }
}

function AddSegment()
{
    character.push([character[character.length-1][0],character[character.length-1][1]]);
}

function SpawnApple()
{
    var spawn = true;
    var x = parseInt(Math.random()*16);
    var y = parseInt(Math.random()*16);
    for(var z = 0;z<character.length;z++)
    {
        if(character[z][0] == x && character[z][1] == y)
        {
            spawn = false;
            SpawnApple();
            break;
        }
    }
    if(spawn)
    {
        appleCoords = [x,y];
        draw();
    }
}

window.addEventListener('keydown', function (e) {
    var code = event.which || event.keyCode;
    e.preventDefault();
    if(changeDir == 1)
    {
        //left 
        if(code == 65 || code == 37)
        {
            if(ang!=0)
                ang = 180;
        }
        //right
        if(code == 68 || code == 39)
        {
            if(ang!=180)
                ang = 0;
        }
        //up
        if(code == 83 || code == 40)
        {
            if(ang!=270)
                ang = 90;
        }
        //down
        if(code == 87 || code == 38)
        {
            if(ang!=90)
                ang = 270;
        }
        changeDir = 0;
    }
    //pause
    if(code == 80)
    {
        Pause();
    }
})  

function Pause()
{
    if(pause)
    {
        pause = false;
        updateTimer = setInterval(Update,100);
    }
    else
    {
        pause = true;
        clearInterval(updateTimer);
    }
}

function Update()
{
    changeDir = 1;
    //ChangeDirection(ang);
    Move();
    collision();
    if(playing == true)
        draw();
}

function collision()
{
    //check for collisions with other segments 

    for(var i = 1; i < character.length; i++)
    {
        //alert("col");
        var x = character[0][0];
        var y = character[0][1];

        var segx = character[i][0];
        var segy = character[i][1];

        if(x == segx && y == segy)
        {
            //alert(x+""+y+""+segx+""+segy);
            GameOver();
        }

    }

    //check for collision with wall
    if(character[0][0] >= 16 || character[0][0] < 0 || character[0][1] >= 16 || character[0][1] < 0)
    {
        GameOver();
    }
    //check for collision with apple
    if(character[0][0] == appleCoords[0] && character[0][1] == appleCoords[1])
    {
        SpawnApple();
        AddSegment();
        score += 1;
        document.getElementById("Score").innerHTML = "High Score : " + highScore + " :: Score : "+score;
    }
}

function Move()
{
    for(var z = character.length-1;z>0;z--)
    {
        character[z][0] = character[z-1][0];
        character[z][1] = character[z-1][1];
    }   
    if(ang == 0)
    {
        character[0][0] += 1;
    }  
    else if(ang == 90)
    {
        character[0][1] += 1;
    }  
    else if(ang == 180)
    {
        character[0][0] -= 1;
    }  
    else if(ang == 270)
    {
        character[0][1] -= 1;
    }  
}

function draw()
{
    ctx.clearRect(0,0,600,600);
    ctx.fillStyle = snakeColor;
    for(var z = 0; z < character.length; z++)
    {
       ctx.fillRect(character[z][0] * 35,character[z][1] * 35,33,33);
    }
    ctx.fillStyle = appleColor;
    ctx.fillRect(appleCoords[0] * 35,appleCoords[1] * 35,33,33);
}

function GameOver()
{
    document.getElementById("GameOver").innerHTML = "GameOver - Press Screen to Start Again";
    document.getElementById('GameScreen').style.cursor = "default";
    ctx.clearRect(0,0,600,600);
    clearInterval(updateTimer);
    ang = 0;
    character = [[3,8],[2,8],[1,8]];
    playing = false;

    if(score > highScore)
    {
        highScore = score;
        postGameData("Serpent", highScore);
        document.getElementById("Score").innerHTML = "High Score : " + highScore + " :: Score : "+score;
    }
}