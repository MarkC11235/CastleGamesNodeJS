module.exports.start = function Start(IO)
{
    class player{
        constructor(id){
            this.isAlive = true;
            this.id = id;
            this.score = 0;
            this.color = "rgb(+" + Math.floor(Math.random() * 255) + ", +" + Math.floor(Math.random() * 255) + ", +" + Math.floor(Math.random() * 255) + ")";
            this.x = Math.floor(Math.random() * 400 + 50);
            this.y = Math.floor(Math.random() * 400 + 50);
            this.xMove = 0;
            this.yMove = 0;
        }       
        updatePosition(){
            this.x = this.xMove + this.x;
            this.y = this.yMove + this.y;
        }
        shoot(mouseX, mouseY){
            var x = mouseX - this.x;
            var y = mouseY - this.y;
            var angle = Math.atan2(y, x);
            var speed = 10;
            var bulletX = this.x + (Math.cos(angle) * speed);
            var bulletY = this.y + (Math.sin(angle) * speed);
            bullets.push(new bullet(bulletX, bulletY, Math.cos(angle) * speed, Math.sin(angle) * speed, this.id));
            io.emit('newBullet', {x : bulletX, y : bulletY, id : bullets[bullets.length - 1].id});
        }
    }
    class bullet{
        constructor(x, y, xMove, yMove, id){
            this.x = x;
            this.y = y;
            this.xMove = xMove;
            this.yMove = yMove;
            this.id = id +"-"+ Math.floor(Math.random()*10000);
        }
        updatePosition(){
            this.x = this.xMove + this.x;
            this.y = this.yMove + this.y;
        }
    }

    const io = IO;

    var players = [];
    var bullets = [];

    var clock = setInterval(update, 1000/60);

    io.on('connection', socket => {
        
        console.log("New user connected : "+socket.id);
        players.push(new player(socket.id));
        for(var i = 0; i < players.length; i++){
            io.emit('newUser', {isAlive : true, id : players[i].id, score : players[i].score, color : players[i].color, x : players[i].x, y : players[i].y});
        }

        socket.on("kd", (data) => {
            var find = players.find(i => i.id == data.id);
            switch(data.event){
                case 37:
                    find.xMove = -1;
                    break;
                case 38:
                    find.yMove = -1;
                    break;
                case 39:
                    find.xMove = 1;
                    break;
                case 40:
                    find.yMove = 1;
                    break;
                case 65:
                    find.xMove = -1;
                    break;
                case 87:
                    find.yMove = -1;
                    break;
                case 68:
                    find.xMove = 1;
                    break;
                case 83:
                    find.yMove = 1;
                    break;
            }
        });
        socket.on("ku", (data) => {
            var find = players.find(i => i.id == data.id);
            switch(data.event){
                case 37:
                    find.xMove = 0;
                    break;
                case 38:
                    find.yMove = 0;
                    break;
                case 39:
                    find.xMove = 0;
                    break;
                case 40:
                    find.yMove = 0;
                    break;
                case 65:
                    find.xMove = 0;
                    break;
                case 87:
                    find.yMove = 0;
                    break;
                case 68:
                    find.xMove = 0;
                    break;
                case 83:
                    find.yMove = 0;
                    break;
            }
        });
        socket.on("shoot", (data) => {
            var find = players.find(i => i.id == data.id);
            find.shoot(data.mouseX, data.mouseY);
        });
        socket.on("respawn", (data) => {
            var find = players.find(i => i.id == data.id);
            find.isAlive = true;
            find.score = 0;
            //find.color = "rgb(+" + Math.floor(Math.random() * 255) + ", +" + Math.floor(Math.random() * 255) + ", +" + Math.floor(Math.random() * 255) + ")";
            find.x = Math.floor(Math.random() * 400 + 50);
            find.y = Math.floor(Math.random() * 400 + 50);
            find.xMove = 0;
            find.yMove = 0;
            io.emit('respawn', {isAlive : true, id : find.id, score : find.score, x : find.x, y : find.y});
        });

        socket.on('disconnect', () => {
            console.log("User disconnected : "+socket.id);
            players = players.filter(i => i.id != socket.id);
            io.emit('disconnected', socket.id);
        });
    });

    function update(){
        for(var i = 0; i < players.length; i++){
            players[i].updatePosition();
            io.emit("move", {id : players[i].id, score : players[i].score, color : players[i].color, x : players[i].x, y : players[i].y});
        }

        for(var i = 0; i < bullets.length; i++){
            bullets[i].updatePosition();
            io.emit("bullet", {x : bullets[i].x, y : bullets[i].y, id : bullets[i].id});
            for(var j = 0; j < players.length; j++){
                //console.log(bullets[i].x + " " + bullets[i].y + " " + players[j].x + " " + players[j].y);
                if(bullets[i].x >= players[j].x && bullets[i].x <= players[j].x + 50 && bullets[i].y >= players[j].y && bullets[i].y <= players[j].y + 50){
                    if(players[j].id == bullets[i].id.split("-")[0] || players[j].isAlive == false){
                        continue;
                    }
                    else
                    {
                        for(var k = 0; k < players.length; k++){
                            if(players[k].id == bullets[i].id.split("-")[0]){
                                players[k].score++;
                                io.emit("score", {id : players[k].id, score : players[k].score});
                            }
                        }
                        io.emit("removeBullet", {id : bullets[i].id});
                        bullets.splice(i, 1);
                        io.emit("die", {id : players[j].id});
                        players[j].isAlive = false;
                        break;
                    }
                }
                else if(bullets[i].x < 0 || bullets[i].x > 500 || bullets[i].y < 0 || bullets[i].y > 500){
                    io.emit("removeBullet", {id : bullets[i].id});
                    bullets.splice(i, 1);
                    break;
                }
            }
        }
    }
}
