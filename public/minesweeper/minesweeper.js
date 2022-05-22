const gridDisplay = document.getElementsByClassName("gridEasy")[0];
var cells = Array.from(Array(10), _ => Array(10).fill(0));
var cellVal = Array.from(Array(10), _ => Array(10).fill(0));
var cellReveal = Array.from(Array(10), _ => Array(10).fill(false));

var cellsToReveal = 100;

const difficultyButton = document.getElementById("difficulty");

var time = 0;
const timeText = document.getElementById("time");
var timeInt = 0;

//alert(cells);

var difficulty = "easy";

var playing = false;
var canStartNewGame = true;

function Start()
{
    if(canStartNewGame == true)
    {
        clearInterval(timeInt);
        timeInt = 0;

        time = 0;
        timeText.innerHTML = "Time : "+time.toFixed(0) +" seconds";
        timeInt = setInterval(clock, 1000);


        playing = true;
    while(gridDisplay.firstChild){
        gridDisplay.removeChild(gridDisplay.firstChild);
    }
        
    var r;
    var c;

    if(difficulty == "easy")
    {
        r = 10;
        c = 10;
        gridDisplay.className = "gridEasy";
    }
    else if(difficulty == "medium")
    {
        r = 15;
        c = 15;
        gridDisplay.className = "gridMedium";
    }
    else if(difficulty == "hard")
    {
        r = 20;
        c = 20;
        gridDisplay.className = "gridHard";
    }

    cells = Array.from(Array(r), _ => Array(c).fill(0));
    cellVal = Array.from(Array(r), _ => Array(c).fill(0));
    cellReveal = Array.from(Array(r), _ => Array(c).fill(false));
    cellsToReveal = r*c;

    for(var i = 0; i < r; i++)
    {
        for(var j = 0; j < c; j++)
        {
            var temp = document.createElement("div");
            temp.className = "cell";
            temp.id = i * r + j;
            temp.addEventListener("mousedown",function(e){
                e.preventDefault();
                click(e.target, e.button);
            });
            gridDisplay.appendChild(temp);
            cells[i][j] = temp;
        }
        
    }

    //alert("placingMines")
    fillWithMines(r,c);
    //alert("finishedPlacingMines");
    checkCellVal(r,c);
    //alert("finishedCheckVals");
    startingPoint(r,c);
    //alert("foundStartingPoint");
    }
}

function fillWithMines(r,c)
{
    for(var i = 0; i < r; i++)
    {
        for(var j = 0; j < c; j++)
        {
            if(Math.random() < .15)
            {
                //alert("bomb");
                cellVal[i][j] = -1;
                //alert("cellvalcalc");
                //cells[i*r+j].innerHTML = -1;
                //alert("bombplaced");
                cellsToReveal--;
            }
        }
    }
    //alert(cellsToReveal);
}

function checkCellVal(r,c)
{
    for(var i = 0; i < r; i++)
    {
        for(var j = 0; j < c; j++)
        {
            var mines = 0;

            if(cellVal[i][j] != -1)
            {
                for(var x = i - 1; x < i + 2; x++)
                {
                    for(var y = j - 1; y < j + 2; y++)
                    {
                        if(x > -1 && x < r && y > -1 && y < c)
                        {
                            if(cellVal[x][y]==-1)
                                mines++;
                        }
                    }
                }

                cellVal[i][j] = mines;
                //cells[i*r+j].innerHTML = mines;
            }
        }
    }
}

function startingPoint(r,c)
{
    var notFound = false;
    var startx;
    var starty;
    var cells = cellsToReveal;

    while(notFound != true)
    {
        startx = parseInt(Math.random()*c);
        starty = parseInt(Math.random()*r);
        if(cellVal[starty][startx] == 0)
        {
            notFound = true;
            RevealAdjacent(starty, startx);
        }
    }
}

function RevealAdjacent(i, j)
{
    for(var x = i - 1; x < i + 2; x++)
    {
        for(var y = j - 1; y < j + 2; y++)
        {
            if(x > -1 && x < cellVal.length && y > -1 && y < cellVal.length)
            {
                if(cellVal[x][y] != 0)
                {
                    cells[x][y].innerHTML = cellVal[x][y];
                }
                cells[x][y].style.backgroundColor = "tan";
                if(cellVal[x][y]==0 && cellReveal[x][y]==false)
                {
                    if(cellReveal[x][y]==false)
                    {
                        cellReveal[x][y] = true;
                        cellsToReveal--;
                    }
                    RevealAdjacent(x,y);
                }
                if(cellReveal[x][y]==false)
                {
                    cellReveal[x][y] = true;
                    cellsToReveal--;
                }
            }
        }
    }
    if(cellsToReveal == 0)
    {
        Victory();
    }
    //alert(cellsToReveal);
    //console.log(cellsToReveal);
}

function RevealCell(id)
{
    var i = parseInt(id / cellVal.length);
    var j = id % cellVal.length;
    //alert(i +" " + j);

    if(cellVal[i][j] == -1)
    {
        GameOver();
    }
    else if(cellVal[i][j] == 0)
    {
        RevealAdjacent(i, j);
    }
    else
    {
        cells[i][j].innerHTML = cellVal[i][j];
        cells[i][j].style.backgroundColor = "tan";
        if(cellReveal[i][j]==false)
        {
            cellReveal[i][j] = true;
            cellsToReveal--;
            //console.log(cellsToReveal);
        }
    }

    if(cellsToReveal == 0)
    {
        Victory();
    }
    //alert("reveal");
}

function PlaceFlag(id)
{
    if(cells[parseInt(id/cells.length)][id%cells.length].style.backgroundColor != "red" && cellReveal[parseInt(id/cells.length)][id%cells.length] == false)
    {
        cells[parseInt(id/cells.length)][id%cells.length].style.backgroundColor = "red";
        //alert(id);
    }
    else
    {
        cells[parseInt(id/cells.length)][id%cells.length].style.backgroundColor = "grey";
    }
}

function changeDifficulty()
{
    if(difficulty == "easy")
    {
        difficulty = "medium";
    }
    else if(difficulty == "medium")
    {
        difficulty = "hard";
    }
    else if(difficulty == "hard")
    {
        difficulty = "easy";
    }

    difficultyButton.innerHTML = difficulty;
}

function click(target, mouseButton)
{
    if(playing == true)
    {
        //alert(target.id+" "+mouseButton);
        if(mouseButton == 0)
        {
            RevealCell(target.id);
        }
        else if(mouseButton == 2)
        {
            PlaceFlag(target.id);
        }
    }
}

function clock()
{
    time += 1;
    timeText.innerHTML = "Time : "+time.toFixed(0) +" seconds";
}

function sleep(time)
{
    return new Promise(resolve => setTimeout(resolve, time));
}

async function GameOver()
{   
    playing = false;
    canStartNewGame = false;
    clearInterval(timeInt);
    timeInt = 0;
    for(var i = 0; i < cells.length; i++)
    {
        for(var j = 0; j < cells.length; j++)
        {
            if(cellVal[i][j] == -1)
            {
                await sleep(50);
                cells[i][j].innerHTML = cellVal[i][j];
                cells[i][j].style.backgroundColor = "orange";
            }
        }
    }
    canStartNewGame = true;
}

function Victory()
{
    playing = false;
    clearInterval(timeInt);
    timeInt = 0;
}

//window.onload = Start();   
window.addEventListener("contextmenu", e => e. preventDefault());