const http = require('http');
const express = require('express');
const app = express();
require("dotenv").config();
const path = require('path');

//save login
const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));

app.set('view engine', 'ejs');

const server = app.listen(process.env.SITE_PORT, err => {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Server is listening on port 5000");
    }
});

//data base
app.use(express.urlencoded({ extended: true }));
const db = require('./db.js');
db.db(app);

//socket.io
const s = require('socket.io');
const io = s(server);

var openBattle = require("./gamesServers/openBattle.js");
const path = require('path');
openBattle.start(io);

/*
var l = require("./gamesServers/lobbyBasedGame.js");
l.start(io);

app.get("/lobbyGame-", function (request, response) {
    direct(request, response);
});
*/

function direct(request, response)
{
    var path = request.path;
    var title = "Castle Games"
    var game = false;

    if(path == "/"){
        path = "index.ejs";
    }
    else if (path == "/logout"){
        path = "index.ejs";
        request.session.loggedin = false;
        request.session.username = "";
        request.session.password = "";
    }
    else if(path.substring(path.length-1) == "-") {
        path = path.substring(1,path.length-1);
        title = path + "|"+title;
        game = true;
        path.charAt(0).toUpperCase();
    }
    else{
        path = path.substring(1);
        title = path + "|"+title;
        game = true;
        path.charAt(0).toUpperCase();
    }
   
    response.render(path, {
        loggedIn: request.session.loggedin, 
        username: request.session.username, 
        title : title,
        game : game
    });
}

//home page
app.get("/", function (request, response) {
    direct(request,response);
});
app.get("/contact", function (request, response) {
    direct(request,response);
});
app.get("/patchnotes", function (request, response) {
    direct(request,response);
});
app.get("/login", function (request, response) {
    direct(request,response);
});
app.get("/register", function (request, response) {
    direct(request,response);
});
app.get("/error", function (request, response) {
    direct(request,response);
});
app.get("/user", function (request, response) {
    direct(request,response);
});
app.get("/logout", function (request, response){
    direct(request,response);
});

//games 
app.get("/2048-", function (request, response) {
    direct(request,response);
});
app.get("/Bird-", function (request, response) {
    direct(request,response);
});
app.get("/BlockStack-", function (request, response) {
    direct(request,response);
});
app.get("/CubeDash-", function (request, response) {
    direct(request,response);
});
app.get("/HangMan-", function (request, response) {
    direct(request,response);
});
app.get("/MineSweeper-", function (request, response) {
    direct(request,response);
});
app.get("/Memory-", function (request, response) {
    direct(request,response);
});
app.get("/MeteorShower-", function (request, response) {
    direct(request,response);
});
app.get("/MuffinMaker-", function (request, response) {
    direct(request,response);
});
app.get("/OpenBattle-", function (request, response) {
    direct(request,response);
});
app.get("/Pong-", function (request, response) {
    direct(request,response);
});
app.get("/Rocket-", function (request, response) {
    direct(request,response);
});
app.get("/Serpent-", function (request, response) {
    direct(request,response);
});
app.get("/SuperJumpMan-", function (request, response) {
    direct(request,response);
});
app.get("/TargetPractice-", function (request, response) {
    direct(request,response);
});
app.get("/TowerBuilder-", function (request, response) {
    direct(request,response);
});
app.get("/ZombieSurvival-", function (request, response) {
    direct(request,response);
});
