var updateLoop;
var canvas = document.getElementById("GameScreen");
var ctx = canvas.getContext("2d");

var timer = 3;

var twoPlayer = false;
var aiUpdateLoop;
var dif = "easy";
var aiUpdate = 5;

var isPlaying = false;

//pos x, pos y, scale x, scale y, score, direction

var leftPaddle = [0,250,20,100,0,0];

var rightPaddle =  [680,250,20,100,0,0];

//pos x, pos y, scale x, scale y, direction x, direction y

var ball = [340,240,20,20,1,0]; 

function switchModes()
{
    if(updateLoop==null)
    {
        twoPlayer = !twoPlayer;
        if(twoPlayer==false)
        {
            document.getElementById("Modes").innerHTML = "Switch Modes : SinglePlayer";
            document.getElementById("Difficulty").style.visibility = "visible";
            document.getElementById("Difficulty").innerHTML = "Easy";
        }
        else
        {
            document.getElementById("Modes").innerHTML = "Switch Modes : Multiplayer";
            document.getElementById("Difficulty").style.visibility = "hidden";
        }
    }
}

function Difficulty()
{
    if(updateLoop==null)
    {
        if(dif=="easy")
        {
            dif="medium";
            aiUpdate=7;
            document.getElementById("Difficulty").innerHTML = "Medium";
        }
        else if(dif=="medium")
        {
            dif="hard";
            aiUpdate=10;
            document.getElementById("Difficulty").innerHTML = "Hard";
        }
        else if(dif=="hard")
        {
            dif="easy";
            aiUpdate=5;
            document.getElementById("Difficulty").innerHTML = "Easy";
        }
    }
}

function StartButton()
{
    if(isPlaying == false)
    {
        isPlaying = true;
        Start();
    }
}

function Start()
{
    StartTimer();
    ctx.clearRect(0,0,700,500);
    ctx.fillRect(leftPaddle[0],leftPaddle[1],leftPaddle[2],leftPaddle[3]);
    ctx.fillRect(rightPaddle[0],rightPaddle[1],rightPaddle[2],rightPaddle[3]);
    ctx.fillRect(ball[0],ball[1],ball[2],ball[3]);
}

function StartTimer()
{
    document.getElementById("Timer").innerHTML = "Game Starts in : "+timer;
    if(timer == 0)
    {
        updateLoop = setInterval(Update,1000/60);
        if(twoPlayer!=true)
        {
            aiUpdateLoop = setInterval(aiMoveRightPaddle,1000/aiUpdate);
        }
        document.getElementById("Timer").innerHTML = "Score : "+leftPaddle[4]+" - "+rightPaddle[4];
        timer = 3;
    }
    else
    {
        timer--;
        setTimeout(StartTimer,1000);
    }
}

function Update()
{

    moveLeftPaddle();

    moveRightPaddle();
    
    updateBall();

    ctx.clearRect(0,0,700,500);
    ctx.fillRect(leftPaddle[0],leftPaddle[1],leftPaddle[2],leftPaddle[3]);
    ctx.fillRect(rightPaddle[0],rightPaddle[1],rightPaddle[2],rightPaddle[3]);
    ctx.fillRect(ball[0],ball[1],ball[2],ball[3]);
}

function aiMoveRightPaddle()
{
    if(ball[1]<rightPaddle[1]+35)
    {
        //rightPaddle[1] = ball[1] - Math.random()*150;
        rightPaddle[5]=-1;
    }
    else if(ball[1]>=rightPaddle[1]+65)
    {
        //rightPaddle[1] = ball[1] + Math.random()*-50;
        rightPaddle[5]=1;
    }
}

function moveLeftPaddle()
{
    leftPaddle[1]+=leftPaddle[5]*10;
    if(leftPaddle[1]>475)
    {
        leftPaddle[1]=475;
    }
    if(leftPaddle[1]<-75)
    {
        leftPaddle[1]=-75;
    }
}

function moveRightPaddle()
{
    rightPaddle[1]+=rightPaddle[5]*10;
    if(rightPaddle[1]>475)
    {
        rightPaddle[1]=475;
    }
    if(rightPaddle[1]<-75)
    {
        rightPaddle[1]=-75;
    }
}

function updateBall()
{
    //hit left paddle check
    if(ball[0]<=20&&(ball[1]>=leftPaddle[1]-20 && ball[1]<leftPaddle[1]+120))
    {
        Bounce(0);
    }
    //hit right paddle check
    if(ball[0]>=660&&(ball[1]>=rightPaddle[1]-20 && ball[1]<rightPaddle[1]+120))
    {
        Bounce(1);
    }
    //hit ceiling check
    if(ball[1]>=480 || ball[1]<=0)
    {
        Bounce(2);
    }
    //score left
    if(ball[0]<=10)
    {
        Score(1);
    }
    //score right
    if(ball[0]>=670)
    {
        Score(0);
    }
    //move ball
    ball[0]+=ball[4]*10;
    ball[1]+=ball[5]*4;
}

function Bounce(x)
{
    switch(x)
    {
        case 0:
            if(ball[1]<leftPaddle[1]+25)
            {
                ball[4]=1;
                ball[5]=-1.35;
            }
            else if(ball[1]<leftPaddle[1]+50)
            {
                ball[4]=1.35;
                ball[5]=-1;
            }
            else if(ball[1]<leftPaddle[1]+75)
            {
                ball[4]=1.35;
                ball[5]=1;
            }
            else if(ball[1]<leftPaddle[1]+100)
            {
                ball[4]=1;
                ball[5]=1.35;
            }
            break;
        case 1:
            if(ball[1]<rightPaddle[1]+25)
            {
                ball[4]=-1;
                ball[5]=-1.35;
            }
            else if(ball[1]<rightPaddle[1]+50)
            {
                ball[4]=-1.35;
                ball[5]=-1;
            }
            else if(ball[1]<rightPaddle[1]+75)
            {
                ball[4]=-1.35;
                ball[5]=1;
            }
            else if(ball[1]<rightPaddle[1]+100)
            {
                ball[4]=-1;
                ball[5]=1.35;
            }
            break;
        case 2:
            ball[5]=-ball[5];
            break;
    }
}

function Score(x)
{
    if(x==0)
    {
        leftPaddle = [0,250,20,100,leftPaddle[4]+1,0];
        rightPaddle =  [680,250,20,100,rightPaddle[4],0];
    }
    else
    {
        leftPaddle = [0,250,20,100,leftPaddle[4],0];
        rightPaddle =  [680,250,20,100,rightPaddle[4]+1,0];
    }

    if(leftPaddle[4]==5)
    {
        document.getElementById("Timer").innerHTML = "Left Wins";
        leftPaddle = [0,250,20,100,0,0];
        rightPaddle =  [680,250,20,100,0,0];
        ball = [340,240,20,20,1,0];
        clearInterval(updateLoop);
        updateLoop = null;
        if(twoPlayer!=true)
        {
            clearInterval(aiUpdateLoop);
            aiUpdateLoop=null;
        }
        isPlaying = false;
    }
    else if(rightPaddle[4]==5)
    {
        document.getElementById("Timer").innerHTML = "Right Wins";
        leftPaddle = [0,250,20,100,0,0];
        rightPaddle =  [680,250,20,100,0,0];
        ball = [340,240,20,20,1,0];
        clearInterval(updateLoop);
        updateLoop = null;
        if(twoPlayer!=true)
        {
            clearInterval(aiUpdateLoop);
            aiUpdateLoop=null;
        }
        isPlaying = false;
    }
    else
    {
        ball = [340,240,20,20,1,0];
        if(twoPlayer!=true)
        {
            clearInterval(aiUpdateLoop);
            aiUpdateLoop=null;
        }
        clearInterval(updateLoop);
        Start();
    }
}

//Event Listeners
window.addEventListener('keydown', function (e) {
    var code = event.which || event.keyCode;
    if(code == 87)
    {
        leftPaddle[5]=-1;
    }
    if(code == 83)
    {
        leftPaddle[5]=1;
    }
    if(twoPlayer==true)
    {
        if(code == 75)
        {
            rightPaddle[5]=-1;
        }
        if(code == 77)
        {
            rightPaddle[5]=1;
        }
    }
})  
window.addEventListener('keyup', function (e) {
    var code = event.which || event.keyCode;
    if(code == 87)
    {
        leftPaddle[5]=0;
    }
    if(code == 83)
    {
        leftPaddle[5]=0;
    }
    if(twoPlayer==true)
    {
        if(code == 75)
        {
            rightPaddle[5]=0;
        }
        if(code == 77)
        {
            rightPaddle[5]=0;
        }
    }
})  