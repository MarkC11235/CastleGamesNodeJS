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

//sets the expressjs view engine to ejs
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

//requires the database file
const db = require('./db.js');
//calls the function to open the connection to the database
db.db(app);

const path = require('path');

//socket.io
const s = require('socket.io');
const io = s(server);

//requires the openBattle file
var openBattle = require("./gamesServers/openBattle.js");
//calls function to start open battle server using socket.io (io)
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
    
    if(request.cookies.username != undefined)
    {
        request.session.loggedin = true;
        request.session.username = request.cookies.username;
        request.session.password = request.cookies.password;
    }

    //path 
    // "/" is home page
    // "route-" is a game page
    // "route_" is any other page
    // "routeData" is a request to the database
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
        path = path.substring(1, path.length-1);
        title = path + "|"+title;
        game = true;
    }
    else if(path.indexOf("sitemap.xml") != -1) {
        response.sendFile(p.join(__dirname, "sitemap.xml"));
        return;
    }
    else if(path.substring(path.length-1) == "_"){
        path = path.substring(1, path.length-1);
        title = path + "|"+title;
        game = true;
    }
    else{
        path = "index.ejs";
    }
   
    response.render(path, {
        loggedIn: request.session.loggedin, 
        username: request.session.username, 
        title : title,
        game : game
    }, function(err, html) {
        //if the page doesn't exist 
        //this returns the user to the home page
        //or if there is an error
        //sends response 404 Not Found
        if(err) {
            console.log(err);
            response.status(404).send("404 Not Found");
        }
        else {
            response.send(html);
        }
    });
}

//takes any get request and sends it to the direct function
app.get(/.*/, function(request, response) {
    direct(request,response);
});