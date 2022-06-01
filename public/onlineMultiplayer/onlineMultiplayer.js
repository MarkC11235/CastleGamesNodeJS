var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var socket = io();

document.addEventListener("keydown", function (event) {
    event.preventDefault();
    socket.emit('kd', {event : event.keyCode, id : socket.id});
});

socket.on('move', function (data) {
    ctx.clearRect(data.oldx, data.oldy, 20, 20);
    if(data.num == 1) {
        ctx.fillStyle = "black"; 
        ctx.fillRect(data.x, data.y, 20, 20);
    }
    else if (data.num == 2) {
        ctx.fillStyle = "red";
        ctx.fillRect(data.x, data.y, 20, 20);
    }
});



