module.exports.db = function DB(app){
    const mysql = require('mysql');

    const con = mysql.createConnection({
    host: "database1-castlegames-instance-1.cgi37eybluoy.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
    database: "users"
    });

    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS users", function (err, result) {
        if (err) throw err;
        //console.log("Database created");
    });
    con.query("CREATE TABLE IF NOT EXISTS accounts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(100))", function (err, result) {
        if (err) throw err;
        //console.log("Table created");
    });
    //con.end();
    });

    //register and login 
    app.post('/login', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
    let keepLoggedIn = request.body.keepLoggedIn;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		con.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
                request.session.username = username;
                request.session.password = password;
                request.session.loggedin = true;
                if(keepLoggedIn){
                    response.cookie('username', username, {secure : "auto", maxAge : 1000 * 60 * 60 * 24 * 7});
                    response.cookie('password', password, {secure : "auto", maxAge : 1000 * 60 * 60 * 24 * 7});
                }
				response.redirect('/');
			} else {
				response.redirect('/error');
			}			
			response.end();
		});
	} else {
		response.redirect('/error');
		response.end();
	}
    });

    app.post('/register', function(request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    let email = request.body.email;
    let keepLoggedIn = request.body.keepLoggedIn;
    // Ensure the input fields exists and are not empty
    if (username && password && email) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        con.query('SELECT * FROM accounts WHERE username = ? OR email = ?', [username, email], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                response.redirect('/error');
            } else {
                // Execute SQL query that'll insert the account into the database
                con.query('INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)', [username, password, email], function(error, results, fields) {
                    // If there is an issue with the query, output the error
                    if (error) throw error;
                    // Redirect to home page
                    request.session.username = username;
                    request.session.password = password;
                    request.session.loggedin = true;
                    if(keepLoggedIn){
                        response.cookie('username', username);
                        response.cookie('password', password);
                    }
                    response.redirect('/');
                });
            }
            response.end();
        });
    } else {
        response.redirect('/error');
        response.end();
    }
    });


    //game data
    function getGameData(request, response){
        var path = request.path;
        path = path.substring(1);
        if(request.session.loggedin){
            con.query('SELECT * FROM '+path+' WHERE username = ? AND password = ?', [request.session.username, request.session.password], function(error, results, fields) {
                if (error) throw error;
                // If the account exists
                if (results.length > 0) {
                    response.json(results);
                } else {
                    response.json([]);
                }
                response.end();
            });
        }
        else{
            response.json([]);
            response.end();
        }
    }



    app.get('/SnakeData', function(request, response) {
        getGameData(request, response);
    });
    

    //memory game
    app.get("/MemoryHighScore", function (request, response) {
        if(request.session.loggedin == true)
        {
            con.query("CREATE TABLE IF NOT EXISTS MEMORYHS (username VARCHAR(255), password VARCHAR(255), highscore VARCHAR(50), UNIQUE(username))", function (err, result) {
                if (err) throw err;
                //console.log("Table created");
            });
            con.query('SELECT * FROM MEMORYHS WHERE username = ? AND password = ?', [request.session.username,request.session.password], function (error, results, fields) {
                if (error) 
                    throw error;

                if(results.length > 0)
                {
                    //console.log(results);
                    response.json(results);
                }
                else
                {
                    var highscore = 9999;
                    response.json(highscore);
                }
            });
        }
    });
    app.post("/MemoryHighScore", function (request, response) {
        if(request.session.loggedin == true)
        {
            con.query("CREATE TABLE IF NOT EXISTS MEMORYHS (username VARCHAR(255), password VARCHAR(255), highscore VARCHAR(50), UNIQUE(username))", function (err, result) {
                if (err) throw err;
                //console.log("Table created");
            });
            con.query('SELECT * FROM MEMORYHS WHERE username = ? AND password = ?', [request.session.username,request.session.password], function (error, results, fields) {
                if (error) 
                    throw error;

                if(results.length > 0){
                    con.query('UPDATE MEMORYHS SET highscore = ? WHERE username = ? AND password = ?',
                    [request.body.highscore, request.session.username, request.session.password],
                    function (error, results, fields) {
                        if (error) throw error;
                        //console.log("Highscore updated " + request.body.highscore);
                    });
                }
                else{
                    con.query('INSERT INTO MEMORYHS (username, password, highscore) VALUES (?, ?, ?)',
                    [request.session.username, request.session.password, request.body.highscore],
                    function (error, results, fields) {
                        if (error) throw error;
                        //console.log("Highscore updated " + request.body.highscore);
                    });
                }
            });
            
        }
    });

    //snake game

}