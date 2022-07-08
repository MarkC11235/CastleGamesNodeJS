var canvas = document.getElementById("GameScreen");
canvas.width = 700;
canvas.height = 500;
var ctx = canvas.getContext("2d");

var UpdateClock;

var mouseX = 0;
var mouseY = 0;

var targets = [];

var score = 0;
const scoreText = document.getElementById("score");
var clock = 30;
const clockText = document.getElementById("clock");

var playing = false;
var playButton = document.getElementById("play");

const highScoreText = document.getElementById("highScore");
var highScore = 0;
highScoreText.innerHTML = "High Score : "+highScore;

class target{
    constructor()
    {
        this.rad = Math.random() * 30 + 12;
        this.x = Math.random() * (700 - this.rad*2) + this.rad;
        this.y = Math.random() * (500 - this.rad*2) + this.rad;
        this.xVel = 1 - Math.random() * 2; 
        this.yVel = 1 - Math.random() * 2; 
    }
}

function Start()
{
    if(playing == false)
    {
        canvas.style.cursor = "none";
        score = 0;
        clock = 30;
        playing = true;
        UpdateClock = setInterval(Update, 1000/60);
    }
}

function Update()
{
    clock -= 1/60;
    if(clock < 0)
        clock = 0;

    if(targets.length < 3)
    {
        targets.push(new target());
    }

    MoveTargets();

    scoreText.innerHTML = "Score : "+score;
    clockText.innerHTML = "Time Left : "+clock.toFixed(2);

    Draw();

    if(clock <= 0)
    {
        EndGame();
    }
}

function MoveTargets()
{
    for(var i = 0; i < targets.length; i++)
    {
        targets[i].x += targets[i].xVel;
        targets[i].y += targets[i].yVel;
        if(targets[i].x <= 0 || targets[i].x >= 700)
        {
            targets[i].xVel = -targets[i].xVel;
        }
        else if(targets[i].y <= 0 || targets[i].y >= 500)
        {
            targets[i].yVel = -targets[i].yVel;
        }
    }
}

function Draw()
{
    ctx.clearRect(0,0,700,500);
    ctx.fillStyle = "rgb(170,170,170)";
    ctx.fillRect(0,0,700,500);

    for(var i = 0; i < targets.length; i++)
    {
        Circle(ctx,targets[i].x,targets[i].y,targets[i].rad,true,"blue");
        Circle(ctx,targets[i].x,targets[i].y,targets[i].rad/1.5,true,"yellow");
        Circle(ctx,targets[i].x,targets[i].y,targets[i].rad/2.5,true,"red");
        /*ctx.beginPath();
        ctx.arc(targets[i].x,targets[i].y,targets[i].rad,0,2*Math.PI,true);
        ctx.fillStyle = "blue";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(targets[i].x,targets[i].y,targets[i].rad/1.5,0,2*Math.PI,true);
        ctx.fillStyle = "yellow";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(targets[i].x,targets[i].y,targets[i].rad/2.5,0,2*Math.PI,true);
        ctx.fillStyle = "red";
        ctx.fill();*/ 
    }

    //draw sights
    ctx.beginPath();
    ctx.arc(mouseX,mouseY,10,0,2*Math.PI,true);
    ctx.moveTo(mouseX,mouseY+2);
    ctx.lineTo(mouseX, mouseY+10);
    ctx.moveTo(mouseX,mouseY - 2);
    ctx.lineTo(mouseX, mouseY-10);
    ctx.moveTo(mouseX+2,mouseY);
    ctx.lineTo(mouseX+10, mouseY);
    ctx.moveTo(mouseX-2,mouseY);
    ctx.lineTo(mouseX-10, mouseY);
    ctx.stroke();
}

async function EndGame()
{
    clearInterval(UpdateClock);
    UpdateClock = 0;
    ctx.clearRect(0,0,700,500);
    canvas.style.cursor = "default";

    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Time's up", 250, 200);

    if(score > highScore)
    {
        highScore = score;
        highScoreText.innerHTML = "High Score : "+highScore;
        await postGameData("TargetPractice", highScore);
    }

    await sleep(1000);
    playing = false;
}

function sleep(time)
{
    return new Promise(resolve => setTimeout(resolve, time));
}

document.addEventListener('mousemove', function(e){
    var rect = canvas.getBoundingClientRect();
	mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

document.addEventListener("mousedown",function(e){
    var hitTarget = false;
    for(var i = 0; i < targets.length; i++)
    {
        var dist = Math.sqrt(Math.pow(mouseX-targets[i].x,2)+Math.pow(mouseY-targets[i].y,2));
        if(dist <= targets[i].rad)
        {
            if(dist <= targets[i].rad/2.5)
                score+=3;
            else if(dist <= targets[i].rad/1.5)
                score+=2;
            else
                score+=1;

            targets.splice(i,1);
            i--;

            hitTarget = true;
        }
    }
    if(hitTarget == false)
        score -= 2;
})

async function getData()
{
    var temp = await getGameData("TargetPractice");
    console.log(temp);
    if(temp != null)
    {
        highScore = temp;
        highScoreText.innerHTML = "High Score : "+highScore;
    }
}

getData();
