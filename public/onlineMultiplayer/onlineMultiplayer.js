var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var socket = io();

var players = [];
var bullets = [];

var mx = 0;
var my = 0;

//connections
socket.on('newUser', (data) => {
    var check = false;
    for(var i = 0; i < players.length; i++){
        if(players[i].id == data.id){
            check = true;
        }
    }
    if(!check){
        players.push(data);
    }
    //console.log(players);
});
socket.on('disconnected', (id) => {
    console.log("User disconnected : "+id);
    var temp;
    for(var i = 0; i < players.length; i++){
        if(players[i].id == id){
            temp = i;
        }
    }
    players.splice(temp, 1);
});

//game listeners
document.addEventListener("keydown", function (event) {
    event.preventDefault();
    if(players.find(i => i.id == socket.id).isAlive)
        socket.emit('kd', {event : event.keyCode, id : socket.id});
});
document.addEventListener("keyup", function (event) {
    event.preventDefault();
    if(players.find(i => i.id == socket.id).isAlive)
        socket.emit('ku', {event : event.keyCode, id : socket.id});
});
document.addEventListener("mousemove", function(e) { 
    if(players.find(i => i.id == socket.id).isAlive)
    {
        var cRect = canvas.getBoundingClientRect();        
        mx = Math.round(e.clientX - cRect.left);   
        my = Math.round(e.clientY - cRect.top);   
    } 
});
document.addEventListener("click", function(e) {
    if(players.find(i => i.id == socket.id).isAlive)
        socket.emit('shoot', {id : socket.id, mouseX : mx, mouseY : my});
    else if(!players.find(i => i.id == socket.id).isAlive)
        socket.emit('respawn', {id : socket.id});
});

//response from server
//player
socket.on('move', function (data) {
    var temp;
    for(var i = 0; i < players.length; i++){
        if(players[i].id == data.id){
            temp = i;
        }
    }
    //console.log(data);
    players[temp].x = data.x;
    players[temp].y = data.y;
});

socket.on("hit", function(data){
    var temp;
    for(var i = 0; i < players.length; i++){
        if(players[i].id == data.id){
            temp = i;
        }
    }
    players[temp].health -= 1;
});

socket.on("die", (data) => {
    var temp;
    for(var i = 0; i < players.length; i++){
        if(players[i].id == data.id){
            players[i].isAlive = false;
            temp = i;
            break;
        }
    }
    if(players[temp].id == socket.id){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.font = "50px Arial";
        ctx.fillText("YOU DIED", 120, 100);
        ctx.font = "30px Arial";
        ctx.fillText("Click on the Screen to Respawn", 35, 200);
    }
});

socket.on("respawn", (data) => {
    for(var i = 0; i < players.length; i++){
        if(players[i].id == data.id){
            players[i].isAlive = true;
            players[i].x = data.x;
            players[i].y = data.y;
            players[i].score = data.score;
            players[i].size = data.size;
            players[i].maxHelath = data.maxHelath;
            players[i].health = data.health;
            break;
        }
    }
});

//bullets
socket.on('newBullet', function (data) {
    var check = false;
    for(var i = 0; i < bullets.length; i++)
    {
        if(bullets[i].id == data.id){
            check = true;
            break;
        }
    }
    if(!check){
        bullets.push(data);
    }
});

socket.on('removeBullet', function (data) {
    for(var i = 0; i < bullets.length; i++){
        if(bullets[i].id == data.id){
            bullets.splice(i, 1);
            break;
        }
    }
});

socket.on("bullet", function (data) {
    for(var i = 0; i < bullets.length; i++){
        if(bullets[i].id == data.id){
            bullets[i].x = data.x;
            bullets[i].y = data.y;
            break;
        }
    }
});

socket.on("score", function (data) {
    for(var i = 0; i < players.length; i++){
        if(players[i].id == data.id){
            players[i].score = data.score;
            players[i].size = data.size;
            players[i].maxHelath = data.maxHelath;
            players[i].health = data.health;
            break;
        }
    }
});


//client functions
function update(){
    var find = players.find(i => i.id == socket.id);
    var x = find.x - 325;
    var y = find.y - 325;
    if(find.isAlive)
    {
        //clear and put grey background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(180, 180, 180)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        //background lines
        ctx.fillStyle = "rgb(0, 0, 0)";
        for(var i = -65; i < 65; i++){
            ctx.fillRect(i*(50) - x, -2500, 1, 5000);
            ctx.fillRect(-2500, i*(50) - y, 5000, 1);
        }
        
        //draw players
        for(var i = 0; i < players.length; i++){
            if(players[i].isAlive && players[i].id == find.id){
                //self
                ctx.fillStyle = players[i].color;
                ctx.fillRect(312.5 - find.score * .05, 312.5 - find.score * .05, find.size, find.size);

                //score
                ctx.fillStyle = "black";
                ctx.font = (15 + (find.score * .05))+"px Arial";
                ctx.fillText(find.score, 317.5 - find.score * .05, 332.5);

                //health
                ctx.fillStyle = "red";
                ctx.fillRect(317.5 - find.score * .01, 300 - find.score * .05, 15 + find.score * .02 , 3);

                ctx.fillStyle = "green";
                ctx.fillRect(317.5 - find.score * .01, 300 - find.score * .05, (15 + find.score * .02) * (find.health/find.maxHelath) , 3);

            }
            else if(players[i].isAlive){
                //others
                ctx.fillStyle = players[i].color;
                ctx.fillRect(players[i].x - x, players[i].y - y, 25, 25);

                //score
                ctx.fillStyle = "black";
                ctx.font = "15px Arial";
                ctx.fillText(players[i].score, players[i].x+5 - x, players[i].y+20 - y);

                //health
                ctx.fillStyle = "red";
                ctx.fillRect(players[i].x - x + 5 - players[i].score * .01, players[i].y - y - 10, 15, 3);

                ctx.fillStyle = "green";
                ctx.fillRect(players[i].x - x + 5 - players[i].score * .01, players[i].y - y - 10, 15 * (players[i].health/players[i].maxHelath), 3);
            }
        }

        //draw bullets
        for(var i = 0; i < bullets.length; i++){
            ctx.fillStyle = "red";
            ctx.fillRect(bullets[i].x - x, bullets[i].y - y, 5, 5);
        }

        //draw coords
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, 170, 30);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("x: " + (find.x).toFixed(0) + " y: " + (-find.y).toFixed(0), 10, 20);

    }
}

var clock;
socket.on("clock", function (data) {
    clock = setInterval(update, 1000/60);
});