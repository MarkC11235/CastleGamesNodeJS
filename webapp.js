const http = require('http');
const express = require('express');
const app = express();
require("dotenv").config();
const p = require('path');
const bodyParser = require('body-parser');

app.use(express.static('sitemap.xml'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//save login
const session = require('express-session');
app.set("trust proxy", 1);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: "auto"
    }
}));


app.use(express.static(p.join(__dirname, 'public')));
app.set("views", p.join(__dirname, "views"));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.SITE_PORT, err => {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Server is listening on port 5000");
    }
});

//handle uncaught errors
process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1);
});

//data base
app.use(express.urlencoded({ extended: true }));

const db = require('./db.js');
db.db(app);

const path = require('path');

//socket.io
const s = require('socket.io');
const io = s(server);

var openBattle = require("./gamesServers/openBattle.js");
openBattle.start(io);

var zombieWorld = require("./gamesServers/zombieWorld.js");
zombieWorld.start(io);


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
    
    if(request.cookies.username != undefined)
    {
        request.session.loggedin = true;
        request.session.username = request.cookies.username;
        request.session.password = request.cookies.password;
    }

    if(path == "/"){
        path = "index.ejs";
    }
    else if (path == "/logout"){
        
        path = "index.ejs";
        request.session.loggedin = false;
        request.session.username = "";
        request.session.password = "";
        response.clearCookie("username");
        response.clearCookie("password");
        
    }
    else if(path.substring(path.length-1) == "-") {
        path = path.substring(1,path.length-1);
        title = path + "|"+title;
        game = true;
    }
    else if(path.indexOf("sitemap.xml") != -1) {
        response.sendFile(p.join(__dirname, "sitemap.xml"));
        return;
    }
    else{
        path = path.substring(1);
        title = path + "|"+title;
        game = true;
    }
   
    response.render(path, {
        loggedIn: request.session.loggedin, 
        username: request.session.username, 
        title : title,
        game : game
    });
}

//accessing all pages except game pages
app.get("/", function (request, response) {
    direct(request,response);
});
// app.get("/categories", function (request, response) {
//     direct(request,response);
// });
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

//accessing games 
app.get("/2048-", function (request, response) {
    direct(request,response);
});
app.get("/Bird-", function (request, response) {
    direct(request,response);
});
app.get("/BlackJack-", function (request, response) {
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
app.get("/OppositesAttract-", function (request, response) {
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

//sitemap
app.get("/sitemap.xml", function (request, response) {
    direct(request,response);
});