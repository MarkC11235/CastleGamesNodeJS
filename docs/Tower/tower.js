document.addEventListener("keydown", function(e){
    e.preventDefault();
    var code = e.key;
    if(code == " " && playing == false)
    {
        Start();
    }
    else if(code == " " && playing == true)
    {
        PlacePiece();
    }
})

var canvas = document.getElementById("GameScreen");
canvas.height = 600;
canvas.width = 600;
var ctx = canvas.getContext("2d");

var colors = ["red", "lightblue", "green", "orange", "yellow"];

var currentPiece = {
    x : 0,
    y : 550,
    len : 250,
    height : 50,
    xDir : 3.5,
    color : colors[parseInt(Math.random()*5)]
};

var previousPiece = {
    x : 0,
    y : 600,
    len : 600,
    height : 0,
    xDir : 0,
    color : colors[parseInt(Math.random()*5)]
};

var pieces = [];

var updateClock = 0;
var playing = false;

var highScore = 0;

async function getData()
{
    var temp = await getGameData("TowerBuilder");
    if(temp != null)
    {
        highScore = temp.highScore;
        scoreText.innerHTML = "High Score : " + highScore + " :::: Score : " + score;
    }
}

var score = 0;
var scoreText = document.getElementById("Score");
scoreText.innerHTML = "High Score : " + highScore + " :::: Score : " + score;

function Start()
{
    if(playing == false)
    {
        playing = true;
        updateClock = setInterval(Update, 1000/60);
        pieces.push(currentPiece);
        score = 0;
        scoreText.innerHTML = "High Score : " + highScore + " :::: Score : " + score;
        //alert("hi");
        //alert(pieces);
    }
}

function Update()
{
    //alert("hi");
    MovePiece();
    
    Draw();
}

function MovePiece()
{
    currentPiece.x += currentPiece.xDir;
    //alert("hi");
    if(currentPiece.x + currentPiece.len >= 600 || currentPiece.x <= 0)
    {
        currentPiece.xDir = -currentPiece.xDir;
    }
}

function PlacePiece()
{
    if(currentPiece.x + currentPiece.len <= previousPiece.x || currentPiece.x >= previousPiece.x + previousPiece.len) 
    {
        GameOver();
    }   
    else
    {
        CreatePiece();
        score += 1;
        scoreText.innerHTML = "High Score : " + (score > highScore ? score : highScore) + " :::: Score : " + score;
    }   
}

function CreatePiece()
{
    var xspot;
    var len;

    
    if(Math.abs(currentPiece.x - previousPiece.x) > .05 * currentPiece.len){
        //alert("hi")
        if(currentPiece.x < previousPiece.x){
            xspot = previousPiece.x;
        }
        else{
            xspot = previousPiece.x + Math.abs(currentPiece.x - previousPiece.x);
        }
        len = previousPiece.len - Math.abs(currentPiece.x - previousPiece.x);
    }
    else{
        //alert("hi")
        xspot = previousPiece.x;
        len = previousPiece.len;
    }

   
    if(score > 0)
    {
        currentPiece.len = len;
        currentPiece.x = xspot;
    }
    else{
        len = currentPiece.len;
    }

    previousPiece = currentPiece;

    currentPiece = {
        x : Math.random() > .5 ? 599 - len : 0,
        y : previousPiece.y - 50,
        len : len,
        height : 50,
        xDir : 3.5 + (score * .08),
        color : colors[parseInt(Math.random()*5)]
    }

    pieces.push(currentPiece);

    /*
    var newLen;
    var newX;

    if(Math.abs(currentPiece.x - previousPiece.x) > .2 * currentPiece.len)
    {
        newLen = currentPiece.len - Math.abs(currentPiece.x - previousPiece.x);
        if(currentPiece.x < previousPiece.x)
        {
            newX = previousPiece.x
        }
        else
        {
            newX = currentPiece.x;
        }
    }
    else
    {
        newLen = currentPiece.len;
        newX = currentPiece.x;
    }

        
    previousPiece = currentPiece;

    if(score > 0)
    {
        currentPiece.x = newX;
        previousPiece.len = newLen;
    }

    currentPiece = {
        x : Math.random() > .5 ? 599 - previousPiece.len : 0,
        y : previousPiece.y - 50,
        len : previousPiece.len,
        height : 50,
        xDir : 3.5 + (score * .08),
        color : colors[parseInt(Math.random()*5)]
    }

    pieces.push(currentPiece);

    */


    if(pieces[pieces.length - 1].y < 50)
    {
        ClearBoard();
    }  

    //alert(pieces);
}

function ClearBoard()
{
    var temp1 = currentPiece;
    temp1.y = 500;
    var temp2 = previousPiece;
    temp2.y = 550;
    pieces.splice(0);
    
    pieces.push(temp2);
    pieces.push(temp1);
}

async function GameOver()
{
    playing = false;
    clearInterval(updateClock);
    updateClock = 0;

    pieces.splice(0);

    currentPiece = {
        x : 0,
        y : 550,
        len : 250,
        height : 50,
        xDir : 5,
        color : colors[parseInt(Math.random()*5)]
    };
    
    previousPiece = {
        x : 0,
        y : 600,
        len : 600,
        height : 0,
        xDir : 0,
        color : colors[parseInt(Math.random()*5)]
    }
    ctx.clearRect(0,0,600,600);

    if(score > highScore || highScore == null)
    {
        highScore = score;
        scoreText.innerHTML = "High Score : " + highScore + " :::: Score : " + score;
        await postGameData("TowerBuilder", {highScore : highScore});
    }
}

function Draw()
{
    ctx.clearRect(0,0,600,600);
    for(var i = 0; i < pieces.length; i++)
    {
        var x = pieces[i];

        ctx.fillStyle = "black";
        ctx.fillRect(x.x, x.y, x.len, x.height);

        ctx.fillStyle = x.color;
        ctx.fillRect(x.x + 2, x.y + 2, x.len - 4, x.height - 4);
    }
}

getData();