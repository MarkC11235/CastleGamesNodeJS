module.exports.start = function Start(IO)
{
    class player{
        constructor(id){
            this.isAlive = true;
            this.id = id;
            this.score = 0;
            this.size = 25;
            this.maxHelath = 5;
            this.health = 5;
            this.color = "rgb(+" + Math.floor(Math.random() * 200 + 55) + ", +" + Math.floor(Math.random() * 200 + 55) + ", +" + Math.floor(Math.random() * 200 + 55) + ")";
            this.x = Math.floor(Math.random() * 2400) * (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
            this.y = Math.floor(Math.random() * 2400) * (Math.floor(Math.random() * 2) == 1 ? 1 : -1);
            this.xMove = 0;
            this.yMove = 0;
        }       
        updatePosition(){
            if(this.xMove + this.x < 2500 && this.xMove + this.x > -2500){
                this.x = this.xMove * 1.5 + this.x;
            }
            if(this.yMove + this.y < 2500 && this.yMove + this.y > -2500){
                this.y = this.yMove * 1.5 + this.y;
            }
        }
        shoot(mouseX, mouseY){
            var x = mouseX - 312.5;
            var y = mouseY - 312.5;
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
            this.id = id +"#"+ Math.floor(Math.random()*1000);
            this.timer = 1;
        }
        updatePosition(){
            this.x = this.xMove + this.x;
            this.y = this.yMove + this.y;
            this.timer -= (1.0 / 60.0);
            if(this.timer <= 0){
                io.emit('removeBullet', {id : this.id});
                for(var i = 0; i < bullets.length; i++){
                    if(bullets[i].id == this.id){
                        bullets.splice(i, 1);
                        //console.log("removed bullet");
                        return true;
                    }
                }
            }
            return false;
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
            io.emit('newUser', {isAlive : players[i].isAlive, id : players[i].id, score : players[i].score, maxHelath : players[i].maxHelath,
                 health : players[i].health, size : players[i].size, color : players[i].color, x : players[i].x, y : players[i].y});
        }
        io.sockets.to(socket.id).emit("clock");

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
            find.health = 5;
            find.maxHelath = 5;
            find.size = 25;
            find.x = Math.floor(Math.random() * 2400) * (Math.floor(Math.random() * 2) == 0 ? 1 : -1);
            find.y = Math.floor(Math.random() * 2400) * (Math.floor(Math.random() * 2) == 0 ? 1 : -1);
            find.xMove = 0;
            find.yMove = 0;
            io.emit('respawn', {isAlive : true, id : find.id, score : find.score, size : find.size, health : find.health,
                 maxHelath : find.maxHelath, x : find.x, y : find.y});
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
            if(bullets[i].updatePosition())
                continue;     
            var check = false;
            for(var j = 0; j < players.length; j++){
                if(bullets[i].x + 5 >= players[j].x && bullets[i].x <= players[j].x + players[j].size && bullets[i].y + 5 >= players[j].y && bullets[i].y <= players[j].y + players[j].size){
                    if(players[j].id == bullets[i].id.split("#")[0] || players[j].isAlive == false){
                        continue;
                    }
                    else
                    {
                        players[j].health--;
                        io.emit("hit", {id : players[j].id});
                        if(players[j].health <= 0){    
                            players[j].isAlive = false;
                            io.emit("die", {id : players[j].id});
                            for(var k = 0; k < players.length; k++){
                                if(players[k].id == bullets[i].id.split("#")[0]){
                                    players[k].score++;
                                    players[k].size += players[k].score * 0.1;
                                    if(players[k].score % 5 == 0){
                                        players[k].maxHelath++;
                                        players[k].health = players[k].maxHelath;
                                    }
                                    io.emit("score", {id : players[k].id, score : players[k].score, size : players[k].size, health : players[k].health, maxHelath : players[k].maxHelath});
                                }
                            }
                        }
                        io.emit("removeBullet", {id : bullets[i].id});
                        bullets.splice(i, 1);
                        check = true;
                        break;
                    }
                }
            }
            if(!check)
                io.emit("bullet", {x : bullets[i].x, y : bullets[i].y, id : bullets[i].id});
        }
    }
}
