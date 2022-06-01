const http = require('http');
const express = require('express');
const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

const server = app.listen(5000, err => {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Server is listening on port 5000");
    }
});

const io = require('socket.io')(server);

var players = 0;

io.on('connection', socket => {
    console.log("New user connected : "+socket.id);

    io.emit('newUser', socket.id);

    players++;
    if(players%2 == 0) {
        player1.id = socket.id;
    }
    else {
        player2.id = socket.id;
    }

    socket.on("kd", (data) => {
        console.log(data);
        switch (data.id) {
            case player1.id:
                var oldx = player1.x;
                var oldy = player1.y;
                switch (data.event) {
                    case 37:
                        player1.x -= 3;
                        break;
                    case 38:
                        player1.y -= 3;
                        break;
                    case 39:
                        player1.x += 3;
                        break;
                    case 40:
                        player1.y += 3;
                        break;
                }
                io.emit("move", {x: player1.x, y: player1.y, oldx : oldx, oldy : oldy, num : 1});
                break;
            case player2.id:
                var oldx = player2.x;
                var oldy = player2.y;
                switch (data.event) {
                    case 37:
                        player2.x -= 3;
                        break;
                    case 38:
                        player2.y -= 3;
                        break;
                    case 39:
                        player2.x += 3;
                        break;
                    case 40:
                        player2.y += 3;
                        break;
                }
                io.emit("move", {x: player2.x, y: player2.y, oldx : oldx, oldy : oldy, num : 2});
                break;
        }
        
    });
});


var player1 = {
    x: 200,
    y: 250,
    color: "red",
    id: "",
};

var player2 = {
    x: 300,
    y: 250,
    color: "black",
    id: "",
};


app.get("/test-", function (request, response) {
    response.render('onlineMultiplayer.ejs');
});

//home page
app.get("/", function (request, response) {
    response.render('index.ejs');
});
app.get("/contact", function (request, response) {
    response.render('contact.ejs');
});
app.get("/patchnotes", function (request, response) {
    response.render('patchNotes.ejs');
});

//games 
app.get("/2048-", function (request, response) {
    response.render('2048.ejs');
});
app.get("/Bird-", function (request, response) {
    response.render('bird.ejs');
});
app.get("/BlockStack-", function (request, response) {
    response.render('blockStack.ejs');
});
app.get("/CubeDash-", function (request, response) {
    response.render('cubeDash.ejs');
});
app.get("/HangMan-", function (request, response) {
    response.render('hangMan.ejs');
});
app.get("/MineSweeper-", function (request, response) {
    response.render('minesweeper.ejs');
});
app.get("/Memory-", function (request, response) {
    response.render('memory.ejs');
});
app.get("/MeteorShower-", function (request, response) {
    response.render('meteorShower.ejs');
});
app.get("/IdleGame-", function (request, response) {
    response.render('muffinMaker.ejs');
});
app.get("/Pong-", function (request, response) {
    response.render('pong.ejs');
});
app.get("/Rocket-", function (request, response) {
    response.render('rocket.ejs');
});
app.get("/Serpent-", function (request, response) {
    response.render('snake.ejs');
});
app.get("/Platformer-", function (request, response) {
    response.render('superJumpMan.ejs');
});
app.get("/TargetPractice-", function (request, response) {
    response.render('targetPractice.ejs');
});
app.get("/TowerBuilder-", function (request, response) {
    response.render('towerBuilder.ejs');
});
app.get("/ZombieSurvival-", function (request, response) {
    response.render('zombieSurvival.ejs');
});
