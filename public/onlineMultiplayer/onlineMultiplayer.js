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
    console.log(players);
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
canvas.addEventListener("mousemove", function(e) { 
    if(players.find(i => i.id == socket.id).isAlive)
    {
        var cRect = canvas.getBoundingClientRect();        
        mx = Math.round(e.clientX - cRect.left);   
        my = Math.round(e.clientY - cRect.top);   
    } 
});
canvas.addEventListener("click", function(e) {
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
            break;
        }
    }
});


//client functions
function update(){
    if(players.find(i => i.id == socket.id).isAlive)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i < players.length; i++){
            if(players[i].isAlive){
                ctx.fillStyle = players[i].color;
                ctx.fillRect(players[i].x, players[i].y, 25, 25);
                ctx.fillStyle = "black";
                ctx.font = "15px Arial";
                ctx.fillText(players[i].score, players[i].x+5, players[i].y+20);
            }
        }
        for(var i = 0; i < bullets.length; i++){
            ctx.fillStyle = "red";
            ctx.fillRect(bullets[i].x, bullets[i].y, 5, 5);
        }
    }
}

var clock;
socket.on("clock", function (data) {
    clock = setInterval(update, 1000/60);
});