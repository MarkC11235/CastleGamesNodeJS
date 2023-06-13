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
        },
        userInfo: {
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
                    response.redirect('/loggedIn');
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
    async function getGameData(request, response) {
        var path = request.path;
        path = path.substring(1);
        if (request.session.loggedin) {
            const user = await User.findOne({
              where: {
                username: request.session.username
              }
            });
        
            if (user && user.gameInfo && user.gameInfo[path]) {
              response.json(user.gameInfo[path]);
            } else {
              response.status(404).send('User not found');
            }
          } else {
            response.status(401).send('Unauthorized');
          }
    }

    async function postGameData(request, response){
        let path = request.path;
        const NAME = path.substring(1);
        if (request.session.loggedin) {
            const user = await User.findOne({
              where: {
                username: request.session.username
              }
            });
        
            if (user) {
              const gameData = {
                [NAME] : request.body.data
              };
              console.log(gameData);
              const updatedUser = await user.update({
                gameInfo: {
                  ...user.gameInfo,
                  ...gameData
                }
              });
              response.json(updatedUser);
            } 
            else {
              response.status(404).send('User not found');
            }
        } 
        else {
            response.status(401).send('Unauthorized');
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




    // //User Data
    async function getUserData(request, response) {
        if (request.session.loggedin) {
            const user = await User.findOne({
              where: {
                username: request.session.username
              }
            });
        
            if (user && user.userInfo) {
              response.json(user.userInfo);
            } else {
              response.status(404).send('User not found');
            }
          } else {
            response.status(401).send('Unauthorized');
          }
    }

    async function postUserData(request, response){
        if (request.session.loggedin) {
            const user = await User.findOne({
              where: {
                username: request.session.username
              }
            });
        
            if (user) {
              const userData = {
                theme : request.body.theme,
                profilePicture : request.body.profilePicture
              };
              const updatedUser = await user.update({
                userInfo: {
                    ...user.userInfo,
                    ...userData
                }
              });
              response.json(updatedUser);
            } 
            else {
              response.status(404).send('User not found');
            }
        } 
        else {
            response.status(401).send('Unauthorized');
        }
    }

    //get data
    app.get('/userInfo', function(request, response){
        getUserData(request, response);
    });

    //post data
    app.post('/userInfo', function(request, response){
        postUserData(request, response);
    });
}