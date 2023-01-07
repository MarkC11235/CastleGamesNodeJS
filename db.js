module.exports.db = function DB(app){

    //TODO:
    // make a function that validates that the user is logged in to use in all the other functions
    // make more utility functions for the database, to make it easier to use and more secure


    //requires the mysql module
    const mysql = require('mysql');

    //creates a pool of connections to the database
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port : process.env.DB_PORT,
        database: process.env.DB_NAME,
        connectionLimit: process.env.DB_CONNECTION_LIMIT
    });

    //Helper functions
    function isLoggedin(request){
        if(request.session.loggedin){
            return true;
        } 
        return false;
    }

    //fucntion to gather all data for a specific game and return the top 3 scores
    function getTop3GameScores(game){
        let results = [];
        pool.getConnection(function(err, con) {
            con.query('SELECT * FROM ' + game + 'Data WHERE username = ? AND password = ?', ["mark", "MagicFish7"], function(error, results, fields) {
                if (error){
                    throw error;
                }
                results = results;
            });
            con.release();
        });
        return results;
    }
    //console.log(getTop3GameScores("ChipCount"));

    //Register and Login 

    //called when the user clicks the login button
    //checks if the user exists in the database
    //if the user exists and the given username and password are coorect, the user is logged in
    //if the user does not exist or the given username and password are incorrect, the user is redirected to the error page
    app.post('/login', function(request, response) {
        let username = request.body.username;
        let password = request.body.password;
        let keepLoggedIn = request.body.keepLoggedIn;

        if (username && password) {
            pool.getConnection(function(err, con) {
                con.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {	
                    if (error)
                        throw error;

                    if (results.length > 0) {
                        request.session.username = username;
                        request.session.password = password;
                        request.session.loggedin = true;
                        if(keepLoggedIn){
                            response.cookie('username', username, {secure : "auto", maxAge : 1000 * 60 * 60 * 24 * 365});
                            response.cookie('password', password, {secure : "auto", maxAge : 1000 * 60 * 60 * 24 * 365});
                        }
                        response.redirect('/');
                    } 
                    else {
                        response.redirect('/error');
                    }			
                });
                con.release();
            });
        }
        else {
            response.redirect('/error');
        }
    });

    //called when the user clicks the register button
    //checks if the user already exists in the database
    //if the user does not exist, the user is registered
    //if the user already exists, the user is redirected to the error page
    app.post('/register', function(request, response) {
        let username = request.body.username;
        let password = request.body.password;
        let email = request.body.email;
        let keepLoggedIn = request.body.keepLoggedIn;

        if (username && password && email) {
            pool.getConnection(function(err, con) {
                con.query('SELECT * FROM accounts WHERE username = ? OR email = ?', [username, email], function(error, results, fields) {
                    if (error){
                        console.log("Error: " + error);
                        throw error;
                    }  
                    else if (results.length > 0) {
                        console.log("Account already exists");
                        response.redirect('/error');
                    } else {
                        con.query('INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)', [username, password, email], function(error, results, fields) {
                        
                            if (error) throw error;
                        
                            request.session.username = username;
                            request.session.password = password;
                            request.session.loggedin = true;
                            if(keepLoggedIn){
                                response.cookie('username', username, {secure : "auto", maxAge : 1000 * 60 * 60 * 24 * 365});
                                response.cookie('password', password, {secure : "auto", maxAge : 1000 * 60 * 60 * 24 * 365});
                            }
                            console.log("Account created");
                            response.redirect('/');
                        });
                    }
                });
                con.release();
            });
            }
            else {
                response.redirect('/error');
            }
    });


    //Game Data

    //takes request from user to get data from database
    //then queries the database for the data
    //then sends the data back to the user
    function getGameData(request, response){
        var path = request.path;
        path = path.substring(1);
        if(request.session.loggedin){          
            //gets one connection from connection pool
            pool.getConnection(function(err, con) {
                //query database for game data
                con.query('SELECT * FROM ' + path + ' WHERE username = ? AND password = ?', [request.session.username, request.session.password], function(error, results, fields) {
                    if (error) throw error;
                    // If the account exists
                    if (results.length > 0) {
                        response.json(results);
                    } else {
                        response.json([]);
                    }
                    response.end();
                });
                con.release();
            });
        }
        else{
            response.json([]);
            response.end();
        }
    }

    //takes request from user to post data to database
    //then queries the database to see if data already exists
    //if data exists, update the data
    //if data does not exist, insert the data
    function postGameData(request, response){
        var path = request.path;
        path = path.substring(1);
        if(request.session.loggedin){
            pool.getConnection(function(err, con) {
                //query database for game data
                con.query('SELECT * FROM ' + path + ' WHERE username = ? AND password = ?', [request.session.username, request.session.password], function(error, results, fields) {
                    if (error) 
                        throw error;

                    // If the account exists and the data is not empty
                    // update the data
                    if (results.length > 0) {
                        con.query('UPDATE ' + path + ' SET data = ? WHERE username = ? AND password = ?', [request.body.data, request.session.username, request.session.password], function(error, results, fields) {
                            if (error) 
                                throw error;  
                            response.end();
                        });
                    }
                    // If the account exists and the data is empty
                    // insert the data
                    else{
                        con.query('INSERT INTO '+path+' (username, password, data) VALUES (?, ?, ?)', [request.session.username, request.session.password, request.body.data], function(error, results, fields) {
                            if (error) 
                                throw error;
                            response.end();
                        });
                    }
                });
                con.release();
            });
        }
        else{
            response.end();
        }
    }

    //get data
    //uses regex to match any path that ends with Data
    app.get(/.*Data/, function(request, response){
        getGameData(request, response);
    });
   
    //post data
    //uses regex to match any path that ends with Data
    app.post(/.*Data/, function(request, response){
        postGameData(request, response);
    }); 
}