var grid = [];
var colorGrid = [];
var solvedGrid = [false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false];

var cardsUp = 0;
var card1;
var card2;

var pairs = 0;

var timer = 0;
const timerText = document.getElementById("timer");
var timerInterval = 0;

const bestTimeText = document.getElementById("bestTime");
bestTimeText.innerHTML = "Best Time : " + (localStorage.getItem("bestTime") != null ? parseFloat(localStorage.getItem("bestTime")).toFixed(2) : "-") + " seconds";

var playing = false;
var alreadyPlayed = false;

var colors = ["red","blue","green","yellow","orange","purple","brown","teal"];

function Start()
{
    if(playing == false)
    {
        playing = true;
        pairs = 0;
        timer = 0;
        timerText.innerHTML = "0 seconds";
        cardsUp = 0;
        solvedGrid = [false,false,false,false,false,false,false,
            false,false,false,false,false,false,false,false,false];

    if(alreadyPlayed == true)
    {
        for(var i = 0; i < 16; i++)
        {
            flip(i, false);
        }
    }

    for(var i = 0; i < 16; i++)
    {
        grid[i] = document.getElementById(i);
    }

    var colorUsed = [0,0,0,0,0,0,0,0];
    
    for(var i = 0; i < 16; i++)
    {
        var temp;
        
        while(true)
        {
            temp = parseInt(Math.random()*8);
            if(colorUsed[temp] < 2)
            {
                colorUsed[temp]++;
                break;
            }
        }

        colorGrid[i] = colors[temp];
        grid[i].addEventListener("click",function(e){
            if(solvedGrid[e.target.id] == false)
                click(e.target.id);
        });
    }

    //alert(grid);
    if(alreadyPlayed == true)
    {
        setTimeout(Reveal,900);
    }
    else
    {
        Reveal();
    }
    }
}

function Reveal()
{
    for(var i = 0; i < 16; i++)
    {
        flip(i, true);
    }
    setTimeout(Hide,3000);  
}

async function Hide()
{
    for(var i = 0; i < 16; i++)
    {
        flip(i, false);
    }
    await sleep(900);
    timerInterval = setInterval(Clock,10);
}

function sleep(time)
{
    return new Promise(resolve => setTimeout(resolve, time));
}

async function flip(id, reveal)
{
    var card = grid[id];
    if(reveal == true)
    {
        for(var i = 0; i < 9; i++)
        {
            card.style.transform = "rotateX("+ (i+1)*20 +"deg)";
            await sleep(50);
            if(i > 4)
            {
                grid[id].style.backgroundColor = colorGrid[id];
            }
        }
    }
    else
    {
        for(var i = 9; i < 18; i++)
        {
            card.style.transform = "rotateX("+ (i+1)*20 +"deg)";
            await sleep(50);
            if(i > 13)
            {
                grid[id].style.backgroundColor = "grey";
            }
        }
    }
}

function Clock()
{
    timer += .01;
    timerText.innerHTML = timer.toFixed(2) + " seconds";
}

function click(id)
{
    if(cardsUp < 2 && id != card1 && timer > 0)
    {
        //alert(id);
        flip(id, true);
        if(cardsUp == 0)
        {
            cardsUp = 1;
            card1 = id;
        }
        else
        {
            cardsUp = 2;
            card2 = id;
            CheckMatch();
        }
    }
}

async function CheckMatch()
{
    if(colorGrid[card1]!=colorGrid[card2])
    {
        await sleep(400);
        flip(card1, false);
        flip(card2, false);
    }
    else
    {
        solvedGrid[card1] = true;
        solvedGrid[card2] = true;
        pairs += 1;
        if(pairs == 8)
        {
            GameOver();
        }
    }
    cardsUp = 0;
}

function GameOver()
{
    playing = false;
    clearInterval(timerInterval);
    timerInterval = 0;
    alreadyPlayed = true;
    /*
    if(localStorage.getItem("bestTime") != null)
    {
        if(parseFloat(localStorage.getItem("bestTime")) > timer)
        {
            localStorage.setItem("bestTime",timer);
            bestTimeText.innerHTML = "Best Time : " + timer.toFixed(2) + " seconds";
        }
    }
    else
    {
        localStorage.setItem("bestTime",timer);
        bestTimeText.innerHTML = "Best Time : " + timer.toFixed(2) + " seconds";
    }
    */
    SetHighScore(timer);
}

async function GetHighScore()
{
    var temp;
    await fetch("/MemoryHighScore", {method : "Get"}).then(response => response.json()).then(data => {
        temp = data;
        if(isNaN(temp))
            bestTimeText.innerHTML = "Best Time : " + (parseFloat(temp[0].highscore).toFixed(2)) + " seconds";
        else
            bestTimeText.innerHTML = "Best Time : " + (parseFloat(temp).toFixed(2)) + " seconds";
    });
    //console.log(temp);
    if(isNaN(temp)){
        return temp[0].highscore;
    }
    else{
        return temp;
    }
}
async function SetHighScore(time)
{
    var hs = await GetHighScore();
    hs = (hs == null ? 9999 : parseFloat(hs));
    if(time < hs)
    {
        fetch("/MemoryHighScore", {
            method : "Post", 
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                highscore : time+""
            })
        });
        bestTimeText.innerHTML = "Best Time : " + time.toFixed(2) + " seconds";
    }
}

GetHighScore();