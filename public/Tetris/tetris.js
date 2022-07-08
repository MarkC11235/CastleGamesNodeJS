window.addEventListener("keydown",function(e){
    var code = event.keyCode;
    e.preventDefault();
    if(playing == true)
    {
        if(code == 87 || code == 38)
        {
            RotatePiece();
        }
        if(code == 83 || code == 40)
        {
            SpeedUpPiece();
        }
        if(code == 65 || code == 37)
        {
            MoveLeft();
        }
        if(code == 68 || code == 39)
        {
            MoveRight();
        }
    }
    if(code == 80)
    {
        Pause();
    }
})

window.addEventListener("keyup",function(e){
    var code = event.keyCode;
    e.preventDefault();
    if(playing == true)
    {
        if(code == 83 || code == 40)
        {
            StopSpeedUpPiece();
        }
    }
})

var playing = false;
var paused = false;

var updateTimer;
var speed = 450;
var normalSpeed = true;

//var drawTimer;

var grid = Array.from(Array(22), _ => Array(14).fill(0));
var colorGrid = Array.from(Array(22), _ => Array(14).fill("black"));

var pieces = [];

var level = 0;
var linesCleared = 0;

var score = 0;
var scoreText = document.getElementById("Score");

var highScore = 0;
var highScoreText = document.getElementById("HighScore");

var canvas = document.getElementById("GameScreen");
var ctx = canvas.getContext("2d");


class piece{

    constructor()
    {
        this.pieceShape = [];
        this.color = "black";
        this.row = 0;
        this.col = 5;
        switch(Math.floor(Math.random()*7))
        {
            case 0: 
                //O - block
                this.pieceShape = [[1,1],[1,1]];
                this.color = "red";
                break;
            case 1: 
                //I - block
                this.pieceShape = [[1,1,1,1]];
                this.color = "orange";
                break;
            case 2: 
                //J - block
                this.pieceShape = [[1,0,0],[1,1,1]];
                this.color = "green";
                break;
            case 3: 
                //L - block
                this.pieceShape = [[0,0,1],[1,1,1]];
                this.color = "purple";
                break;
            case 4: 
                //T - block
                this.pieceShape = [[0,1,0],[1,1,1]];
                this.color = "blue";
                break;
            case 5: 
                //S - block
                this.pieceShape = [[0,1,1],[1,1,0]];
                this.color = "yellow";
                break;
            case 6: 
                //Z - block
                this.pieceShape = [[1,1,0],[0,1,1]];
                this.color = "pink";
                break;
        }
        
    }
}

function Start()
{
    if(!playing)
    {
        playing=true;
        updateTimer = setInterval(Update,speed);
        //drawTimer = setInterval(Draw,10);   
        SpawnPiece();
    }
}

function Update()
{
    MoveDown();
}

function Draw()
{
    ctx.clearRect(0,0,1000,1000);
    //piece
    for(var x = 0; x < pieces[0].pieceShape[0].length; x++)
    {
        for(var y = 0; y < pieces[0].pieceShape.length; y++)
        {
            if(pieces[0].pieceShape[y][x]==1)
            {
                var xcoord = (pieces[0].col+x) * 30;
                var ycoord = (pieces[0].row+y) * 30;
                //alert(xcoord+" "+ycoord);
                ctx.fillStyle = "black";
                ctx.fillRect(xcoord,ycoord, 30, 30);
                ctx.fillStyle = pieces[0].color;
                ctx.fillRect(xcoord + 1,ycoord + 1, 28, 28);
            }
        }
    }

    //grid
    for(var x = 0; x < grid[0].length; x++)
    {
        for(var y = 0; y < grid.length; y++)
        {
            if(grid[y][x]==1)
            {
                var xcoord = x * 30;
                var ycoord = y * 30;
                //alert(xcoord+" "+ycoord);
                ctx.fillStyle = "black";
                ctx.fillRect(xcoord,ycoord, 30, 30);
                ctx.fillStyle = colorGrid[y][x];
                ctx.fillRect(xcoord + 1,ycoord + 1, 28, 28);
            }
        }
    }

}

function SpawnPiece()
{
    if(pieces.length!=0)
    {
        for(var x = 0; x < pieces[0].pieceShape[0].length; x++)
        {
            for(var y = 0; y < pieces[0].pieceShape.length; y++)
            {
                if(pieces[0].pieceShape[y][x]==1)
                {
                    if(pieces[0].row + y == 0)
                    {
                        GameOver();
                    }
                    else{
                        grid[pieces[0].row + y][pieces[0].col + x] = 1;
                        colorGrid[pieces[0].row + y][pieces[0].col + x] = pieces[0].color;
                    }
                }
            }
        }

        CheckClear();
        
        if(playing)
        {
            pieces.pop();
            pieces.push(new piece());
            //alert("new");
        }
    }
    else
    {
        pieces.push(new piece());
    }
    Draw();
}

function RotatePiece()
{
    var width = pieces[0].pieceShape[0].length;
    var height = pieces[0].pieceShape.length;
    var newArray = Array.from(Array(width), _ => Array(height).fill(0));

    var rotate = true;
    
    for(var x = 0; x < width; x++)
    {
        for(var y = 0; y < height; y++)
        {
            newArray[x][height-y-1] = pieces[0].pieceShape[y][x];
            if(grid[pieces[0].row + x][pieces[0].col + y]==1 || pieces[0].col + y > 13)
                rotate = false;
        }
    }

    if(rotate == true)
    {
        pieces[0].pieceShape = newArray;
        Draw();
    }
}

function SpeedUpPiece()
{
    if(normalSpeed == true)
    {
        clearInterval(updateTimer);
        updateTimer = setInterval(Update,speed/10);
        normalSpeed = false;
    }
    //alert("speedUp");
}

function StopSpeedUpPiece()
{
    clearInterval(updateTimer);
    updateTimer = setInterval(Update,speed);
    normalSpeed = true;
}

function MoveLeft()
{
    var leftEmpty = true;
    for(var y = 0; y < pieces[0].pieceShape.length; y++)
    {
        for(var x = 0; x < pieces[0].pieceShape[0].length; x++)
        {
            if(pieces[0].col - 1 >= 0)
            {
                if(pieces[0].pieceShape[y][x] == 1 && grid[pieces[0].row + y][pieces[0].col + x - 1] == 1)
                    leftEmpty = false;
            }
        }
    }
    if(pieces[0].col > 0 && leftEmpty == true)
    {
        pieces[0].col-=1;
        Draw();
    }
}

function MoveRight()
{
    var rightEmpty = true;
    for(var y = 0; y < pieces[0].pieceShape.length; y++)
    {
        for(var x = 0; x < pieces[0].pieceShape[0].length; x++)
        {
            if(pieces[0].col + pieces[0].pieceShape[0].length < 14)
            {
                if(pieces[0].pieceShape[y][x] == 1 && grid[pieces[0].row + y][pieces[0].col + x + 1] == 1)
                    rightEmpty = false;
            }
        }
    }
    if(pieces[0].col + pieces[0].pieceShape[0].length < 14 && rightEmpty == true)
    {
        pieces[0].col+=1;
        Draw();
    }
}

function MoveDown()
{
    var belowEmpty = true;

    for(var y = 0; y < pieces[0].pieceShape.length; y++)
    {
        for(var x = 0; x < pieces[0].pieceShape[0].length; x++)
        {
            if(pieces[0].row + y + 1 < 22)
            {
                if(pieces[0].pieceShape[y][x] == 1 && grid[pieces[0].row + y + 1][pieces[0].col + x] == 1)
                    belowEmpty = false;
            }
        }
    }

    if(pieces[0].pieceShape.length+pieces[0].row<22 && belowEmpty == true)
    {
        pieces[0].row += 1;
        //console.log(pieces[0].pieceShape.length+pieces[0].row);
        //console.log(belowEmpty);
    }
    else
    {
        SpawnPiece();
    }

    Draw();
}

function CheckClear()
{
    var rows = [];

    for(var y = 0; y < grid.length; y++)
    {
        var clearRow = true;
        for(var x = 0; x < grid[0].length; x++)
        {
            if(grid[y][x]==0)
            {
                clearRow = false;
                x = grid[0].length;
            }
        }

        if(clearRow == true)
            rows.push(y);
    }

    ClearRow(rows);
}

function ClearRow(rows)
{
    for(var x = 0; x < rows.length; x++)
    {
        grid.splice(rows[x],1);
        grid.unshift([0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
        linesCleared += 1;
        if(linesCleared % 7 == 0)
        {
            LevelInc();
        }
            
    }
    Score(rows.length);
}

function LevelInc()
{
    level+=1;
    scoreText.innerHTML = "Score : "+score+" ----- Level : "+level;
    clearInterval(updateTimer);
    speed-=30;
    updateTimer = setInterval(Update,speed);
}

function Score(rows)
{
    if(rows==1)
    {
        score += (level+1)*40;
    }
    else if(rows==2)
    {
        score += (level+1)*100;
    }
    else if(rows==3)
    {
        score += (level+1)*300;
    }
    else if(rows==4)
    {
        score += (level+1)*1200;
    }
    scoreText.innerHTML = "Score : "+score+" ----- Level : "+level;
}

async function GameOver()
{
    clearInterval(updateTimer);
    updateTimer = 0;
    playing = false;
    ctx.clearRect(0,0,1000,1000);
    grid = Array.from(Array(22), _ => Array(14).fill(0));
    colorGrid = Array.from(Array(22), _ => Array(14).fill("black"));
    pieces = [];

    if(score > highScore)
    {
        highScore = score;
        highScoreText.innerHTML = "High Score : "+highScore;
        await postGameData("BlockStack", highScore);
    }

    score = 0;
    level = 0;
    scoreText.innerHTML = "Score : "+score+" ----- Level : "+level;
}

function Pause()
{
    if(paused == false)
    {
        clearInterval(updateTimer);
        updateTimer = 0;
        paused = true;
    }
    else{
        updateTimer = setInterval(Update,speed);
        paused = false;
    }
}

async function getData(){
    var temp = await getGameData("BlockStack");
    if(temp != null)
    {
        highScore = temp;
        highScoreText.innerHTML = "High Score : "+highScore;
    }
}

getData();