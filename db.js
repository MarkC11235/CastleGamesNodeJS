module.exports.db = function DB(app){

    const { Sequelize, DataTypes } = require('sequelize');
    const Op = Sequelize.Op;

    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    });

    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        gameInfo: {
            type: DataTypes.JSON,
            allowNull: true
        }
    });

    sequelize.sync();

    //Register and Login

    app.post('/register', async function(request, response) {
        let username = request.body.username;
        let password = request.body.password;
        let email = request.body.email;

        if (username && password && email) {
            try {
                //checks if the user already exists in the database
                const existingUser = await User.findOne({
                    where: {
                        [Op.or]: [{ username: username }, { email: email }]
                    }
                });

                //if the user does exist, the user is redirected to the error page(fix this)
                if (existingUser) {
                    console.log('Account already exists');
                    response.redirect('/error');
                } 
                //if the user does not exist, the user is registered
                else {
                    const newUser = await User.create({
                        username: username,
                        password: password,
                        email: email
                    });

                    console.log('User created:', newUser.toJSON());

                    request.session.username = username;
                    request.session.loggedin = true;

                    response.redirect('/');
                }
            } 
            catch (error) {
                console.log('Error:', error);
                response.redirect('/error');
            }
        } 
        else {
            response.redirect('/error');
        }
    });


    app.post('/login', async function(request, response) {
        let username = request.body.username;
        let password = request.body.password;

        if (username && password) {
            try {
                const user = await User.findOne({
                    where: {
                        username: username,
                        password: password
                    }
                });

                if (user) {
                    request.session.username = username;
                    request.session.loggedin = true;
                    response.redirect('/');
                } 
                else {
                    response.redirect('/error');
                }
            } 
            catch (error) {
                console.log('Error:', error);
                response.redirect('/error');
            }
        } 
        else {
            response.redirect('/error');
        }
    });
    

    // //Game Data

    

    // //takes request from user to get data from database
    // //then queries the database for the data
    // //then sends the data back to the user
    // function getGameData(request, response){
    //     var path = request.path;
    //     path = path.substring(1);
    //     if(request.session.loggedin){          
    //         //gets one connection from connection pool
    //         pool.getConnection(function(err, con) {
    //             //query database for game data
    //             con.query('SELECT * FROM ' + path + ' WHERE username = ? AND password = ?', [request.session.username, request.session.password], function(error, results, fields) {
    //                 if (error) throw error;
    //                 // If the account exists
    //                 if (results.length > 0) {
    //                     response.json(results);
    //                 } else {
    //                     response.json([]);
    //                 }
    //                 response.end();
    //             });
    //             con.release();
    //         });
    //     }
    //     else{
    //         response.json([]);
    //         response.end();
    //     }
    // }

    // //takes request from user to post data to database
    // //then queries the database to see if data already exists
    // //if data exists, update the data
    // //if data does not exist, insert the data
    // function postGameData(request, response){
    //     var path = request.path;
    //     path = path.substring(1);
    //     if(request.session.loggedin){
    //         pool.getConnection(function(err, con) {
    //             //query database for game data
    //             con.query('SELECT * FROM ' + path + ' WHERE username = ? AND password = ?', [request.session.username, request.session.password], function(error, results, fields) {
    //                 if (error) 
    //                     throw error;

    //                 // If the account exists and the data is not empty
    //                 // update the data
    //                 if (results.length > 0) {
    //                     con.query('UPDATE ' + path + ' SET data = ? WHERE username = ? AND password = ?', [request.body.data, request.session.username, request.session.password], function(error, results, fields) {
    //                         if (error) 
    //                             throw error;  
    //                         response.end();
    //                     });
    //                 }
    //                 // If the account exists and the data is empty
    //                 // insert the data
    //                 else{
    //                     con.query('INSERT INTO '+path+' (username, password, data) VALUES (?, ?, ?)', [request.session.username, request.session.password, request.body.data], function(error, results, fields) {
    //                         if (error) 
    //                             throw error;
    //                         response.end();
    //                     });
    //                 }
    //             });
    //             con.release();
    //         });
    //     }
    //     else{
    //         response.end();
    //     }
    // }

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