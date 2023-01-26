// Description: This is the main file for the website's server
//              It uses expressjs to create the server and handle requests
//              It uses socket.io to create the server for online games
//              It uses ejs to generate html files
//              It uses the db.js file to connect to the database
//              It uses the openBattle.js file to create the server for the open battle game
//              It uses the cookie-parser and express-session modules to save login information
//              It uses the dotenv module to load environment variables from a .env file into process.env
//              It uses the body-parser module to parse incoming request bodies in a middleware before your handlers
//              It uses the path module to work with file and directory paths
//              It uses the http module to create an http server

// TODO: 
// fix problems labeled TODO
// make database more secure
// make database easier and more flexible to query
// add more functionality to profiles 
// add more games
// write tests for the server that need to be passed before it launches

//imports the dotenv module
//dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require("dotenv").config();

//imports the express module
const express = require('express');
//creates the express app
const app = express();

//imports the http module
const http = require('http');


//parses incoming request body's with urlencoded payloads
//Ex: request.body.username;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//allows the sitemap to be accessed and served (for search engines)
app.use(express.static('sitemap.xml'));


//cookie parser
//parses cookies attached to the client request object
//Ex: request.cookies.username;
//Ex: request.cookies.password;
const cookieParser = require('cookie-parser');
app.use(cookieParser());


//saves login
//TODO: needs to be fixed (not meant for production because it can cause a memory leak)**************************
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


//imports the path module
const p = require('path');
//makes the public folder static so that it can be accessed to serve css and js files
app.use(express.static(p.join(__dirname, 'public')));
//sets the views folder to the views folder 
//so that the ejs(embedded javascript, they generate html files) files can be found
app.set("views", p.join(__dirname, "views"));


//sets the expressjs view engine to ejs(embedded javascript, they generate html files)
app.set('view engine', 'ejs');


//creates the server and starts it
const server = app.listen(process.env.SITE_PORT, err => {
    if (err) {
        console.log("Error: " + err);
    } else {
        console.log("Server is listening on port 5000");
    }
});


//handle uncaught errors by exiting the process
//TODO: (probably should fix)************************************************
process.on('uncaughtException', err => {
    console.error('There was an uncaught error', err);
    process.exit(1);
});

//imports the db.js file
const db = require('./db.js');
//calls the function to open the connection to the database
db.db(app);

//socket.io
//creates the socket.io server
//uses the server created by expressjs
//socket.io is used to create the server for online games
const s = require('socket.io');
const io = s(server);

//requires the openBattle file
var openBattle = require("./gamesServers/openBattle.js");
//calls function to start open battle server using socket.io (io)
openBattle.start(io);

//function that handles all direct(new page) requests
//TODO: fix var game (currently is used for more than just them game pages)
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
        //response.clearCookie("theme");
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
    else if(path.indexOf("error") != -1){
        path = "error.ejs";
        game = true;
    }
    else{
        path = "index.ejs";
    }
   
    response.render(path, {
        loggedIn: request.session.loggedin, 
        username: request.session.username, 
        title : title,
        game : game,
        theme : request.cookies.theme == undefined ? "blue" : request.cookies.theme
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
//used to handle all requests(should only be new page requests)
app.get(/.*/, function(request, response) {
    direct(request,response);
});