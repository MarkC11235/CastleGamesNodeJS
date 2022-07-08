var canvas = document.getElementById("Gamescreen");
canvas.width = 600;
canvas.height = 600;
var ctx = canvas.getContext("2d");

ctx.fillStyle = "lightblue";
ctx.fillRect(0,0,600,600);

var scoreText = document.getElementById("Score");
var highScoreText = document.getElementById("HighScore");
var highScore = 0;

async function GetHighScore(){
    var temp = await getGameData("MeteorShower");
    if(temp != null)
    {
        highScore = temp;
        highScoreText.innerHTML = "High Score : " + highScore;
    }
}

GetHighScore();

var updateLoop = 0;
var spawnMetorLoop = 0;

var player = {
    x : 300,
    y : 550,
    xDir : 0,
    score : 0,
    level : 1,
    canFire : true,
    guns : 1
};

var bulletNum = 0;

var playing = false;

var bullets = [];

var meteors = [];

var powerUps = [];

class bullet{
    constructor()
    {
        this.x = player.x + Math.random()*50;
        this.y = 550;
        this.name = bulletNum++;
        bullets.push(this);
    }

    UpdatePos(){
        this.y -= 10;
        if(this.y < -20)
        {
            for(var i = 0; i < bullets.length; i++)
            {
                if(bullets[i].name == this.name)
                {
                    bullets.splice(i,1);
                }
            }
        }
        else{
            this.CheckMeteors();
        }
    }

    CheckMeteors(){
        for(var i = 0; i < meteors.length; i++)
        {
            //make it check a range
            if((this.x + 10) > meteors[i].x && this.x < (meteors[i].x + meteors[i].len) && this.y > meteors[i].y && this.y < meteors[i].y + 70)
            {
                meteors[i].health -= 1;

                if(meteors[i].health <= 0)
                {
                    if(meteors[i].bomb == true)
                    {
                        GameOver();
                    }
                    else
                    {
                        if(Math.random()>.9935)
                            new powerUp();

                        meteors.splice(i,1);
                        player.score += 5; scoreText.innerHTML = "Score : " + player.score + " :: Level : "+ player.level;
                    }
                }
                
                for(var i = 0; i < bullets.length; i++)
                {
                    if(bullets[i].name == this.name)
                        bullets.splice(i,1);
                }
            }
        }
    }
}

class meteor{
    // make option where it is 
    constructor()
    {
        if(Math.random()>.92)
        {
            this.bomb = true;
            this.health = 1;
            this.xDir = (Math.random() > .5 ? Math.random() * 2 + 1 : -Math.random() * 2 - 1);
            this.x = this.xDir > 0 ? -20 : 620;
            this.y = (Math.random() * 180) + 40;
            this.yDir = 0;
            this.len = 35;
            //alert("bomb");
        }
        else{
            this.bomb = false;
            this.health = parseInt(Math.random() * (player.level + 1)) + 1;
            this.xDir = (Math.random() > .5 ? -Math.random() + .5 : Math.random() + .5);
            this.yDir = (Math.random() * 5 + 2)
            this.len = Math.random() * 70 + 20;
            this.y = -50;
            this.x = Math.random()*400 + 100;
        }
        //alert(this.xDir);
        meteors.push(this);
    }

    UpdatePos(i){
        this.y += this.yDir;
        this.x += this.xDir;
        if(this.x < -20 || this.x > 600)
        {
            meteors.splice(i,1);
        }
        else if(this.y > 600 - meteors[i].len)
        {
            this.FlipYDir();
            player.score -= 1; scoreText.innerHTML = "Score : " + player.score + " :: Level : "+ player.level;
        }
        else if(this.y < 100 && this.yDir < 0)
        {
            this.FlipYDir();
        }
    }

    FlipYDir()
    {
        this.yDir = -this.yDir;
    }
}

class powerUp{
    constructor()
    {
        this.x = Math.random() * 500 + 50;
        this.y = 570;
        this.len = 30;
        powerUps.push(this);
    }
}

function Start()
{
    if(playing == false)
    {
        playing = true;
        updateLoop = setInterval(Update, 1000/60);
        spawnMetorLoop = setInterval(SpawnMeteor, 800);
        scoreText.innerHTML = "Score : " + player.score + " :: Level : " + player.level;
        document.getElementById('Gamescreen').style.cursor = 'none';
    } 
}

function Update()
{
    Move();

    if(player.score > (player.level * 120))
    {
        player.level++;
        scoreText.innerHTML = "Score : " + player.score + " :: Level : " + player.level;
        clearInterval(spawnMetorLoop);
        spawnMetorLoop = setInterval(SpawnMeteor, 800 - (player.level - 1) * 60);
    }

    if(bullets.length != 0)
        MoveBullets();

    if(meteors.length != 0)
    {
        MoveMeteors();
        CheckMeteorCollision();
    }

    if(powerUps.length != 0)
    {
        CheckPowerUpCollision();
    }

    if(playing == true)
        Draw();
    
}

function SpawnMeteor()
{
    new meteor();
}

function MoveMeteors()
{
    for(var i = 0; i < meteors.length; i++)
    {
        meteors[i].UpdatePos(i);
        //meteors[i].CheckMeteors();
    }
}

function CheckMeteorCollision()
{
    for(var i = 0; i < meteors.length; i++)
    {
        if((player.x + 50) > meteors[i].x && player.x < (meteors[i].x + meteors[i].len) && player.y < (meteors[i].y + meteors[i].len - 10))
            GameOver();
    }
}

function CheckPowerUpCollision()
{
    for(var i = 0; i < powerUps.length; i++)
    {
        if((player.x + 50) > powerUps[i].x && player.x < (powerUps[i].x + meteors[i].len))
        {
            player.guns++;
            powerUps.splice(i,1);
        }
    }
}

function Move()
{   
    if(player.x < 0)
    {
        player.x = 0;
    }
    else if(player.x > 550)
    {
        player.x = 550;
    }
    else(player.x >= 0 && player.x <= 550)
    {
        player.x += player.xDir;
    }
}

function MoveBullets()
{
    for(var i = 0; i < bullets.length; i++)
    {
        bullets[i].UpdatePos();
        //bullets[i].CheckMeteors();
    }
}

function Shoot()
{
    if(player.canFire == true)
    {
        for(var i = 0; i < player.guns; i++)
        {
            new bullet();
        }
        player.canFire = false;
        setTimeout(ResetShot, 150);
    }
}

function ResetShot()
{
    player.canFire = true;
}

function Draw()
{
    ctx.clearRect(0,0,600,600);

    ctx.fillStyle = "lightblue";
    ctx.fillRect(0,0,600,600);

    ctx.fillStyle = "green";
    ctx.fillRect(0,560,600,40);

    ctx.fillStyle = "green";
    for(var i = 0; i < bullets.length; i++)
    {
        ctx.fillRect(bullets[i].x, bullets[i].y, 10, 10);
    }

    ctx.fillStyle = "yellow";
    for(var i = 0; i < powerUps.length; i++)
    {
        ctx.fillRect(powerUps[i].x, powerUps[i].y, 30, 30);
    }

    for(var i = 0; i < meteors.length; i++)
    {
        if(meteors[i].bomb == true)
        {
            ctx.fillStyle = "red";
            ctx.fillRect(meteors[i].x, meteors[i].y, meteors[i].len, meteors[i].len);
        }
        else
        {
            //ctx.fillStyle = "black";
            //ctx.fillRect(meteors[i].x - 1, meteors[i].y - 1, meteors[i].len + 2, meteors[i].len + 2);

            switch(meteors[i].health)
            {
                case 1 :
                    ctx.fillStyle = "rgba(50,50,50,.25)";
                    break;
                case 2 :
                    ctx.fillStyle = "rgba(50,50,50,.35)";
                    break;
                case 3 :
                    ctx.fillStyle = "rgba(50,50,50,.45)";
                    break;
                case 4 :
                    ctx.fillStyle = "rgba(50,50,50,.55)";
                    break;
                case 5 :
                    ctx.fillStyle = "rgba(50,50,50,.65)";
                    break;
                case 6 :
                    ctx.fillStyle = "rgba(50,50,50,.75)";
                    break;
                default :
                    ctx.fillStyle = "rgba(50,50,50,.75)";
                    break;
            }

            ctx.fillRect(meteors[i].x, meteors[i].y, meteors[i].len, meteors[i].len);
        }
        
    }

    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, 50, 50);
}

async function GameOver()
{
    //alert("GameOver");
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0,0,600,600);
    clearInterval(updateLoop);
    clearInterval(spawnMetorLoop);
    updateLoop = 0;
    spawnMetorLoop = 0;
    playing = false;
    meteors.splice(0,100);
    bullets.splice(0,100);
    player.x = 300;
    player.level = 1;
    player.guns = 1;
    document.getElementById('Gamescreen').style.cursor = "default";
    if(player.score > highScore)
    {
        highScore = player.score;
        await postGameData("MeteorShower", highScore);
        highScoreText.innerHTML = "High Score : " + highScore;
    }
    player.score = 0;
}

document.addEventListener("keydown", function(e){
    e.preventDefault();
    var code = e.keyCode;
    if(code == 37 || code == 65)
    {
        player.xDir = -5;
    }
    else if(code == 39 || code == 68)
    {
        player.xDir = 5;
    }
})

document.addEventListener("keydown", function(e){
    e.preventDefault();
    var code = e.keyCode;
    if(code == 38 || code == 87 || code == 32)
    {
        Shoot();
    }
})

document.addEventListener("keyup", function(e){
    e.preventDefault();
    var code = e.keyCode;
    if((code == 37 || code == 65) && player.xDir == -5)
    {
        player.xDir = 0;
    }
    else if((code == 39 || code == 68) && player.xDir == 5)
    {
        player.xDir = 0;
    }
})

//window.onload(Start());