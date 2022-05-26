const http = require('http');
const express = require('express');
const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.listen(5000, err => {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Server is listening on port 5000");
    }
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
