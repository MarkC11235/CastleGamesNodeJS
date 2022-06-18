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
        console.log("Database created");
    });
    con.query("CREATE TABLE IF NOT EXISTS accounts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(100))", function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    //con.end();
    });

    //register and login 
    app.post('/login', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
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

}