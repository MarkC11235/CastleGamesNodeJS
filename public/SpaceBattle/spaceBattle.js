const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

class player {
    x = 300
    y = 500
    r = 25
    health = 4
    maxHealth = 4
    score = 0
    bulletTimer = 0
    bulletTimerMax = 0.25
    bulletSpeed = 10
    speed = 1
    movement = {
        horizontal: 0,
        vertical: 0,
        rotation: 0
    }
    sprite = new Image() 
    bullets = []
    hpUp = false;
    speedUp = false;
    fireRateUp = false;
    isHurt = false;

    constructor() {
        this.sprite.src = '/SpaceBattle/blueSpaceShip.png';
    }

    shoot() {
        if(this.bulletTimer > this.bulletTimerMax){
            this.bullets.push(new bullet(this.x, this.y, this.movement.rotation, this.bulletSpeed));
            this.bulletTimer = 0;
        }
    }

    move() {
        if(keyMap['w']){
            this.movement.vertical = -1;
        }
        else if(keyMap['s']) {
            this.movement.vertical = 1;
        }
    
        if(keyMap['a']) {
            this.movement.horizontal = -1;
        }
        else if(keyMap['d']) {
            this.movement.horizontal = 1;
        }
    
        if(keyMap['ArrowLeft']){
            this.movement.rotation += -4;
        }
        else if(keyMap['ArrowRight']){
            this.movement.rotation += 4;
        }
    
        if(this.movement.rotation < -360){
            this.movement.rotation += 360;
        }
        else if(this.movement.rotation > 360){
            this.movement.rotation -= 360;
        }
    
        if(this.x + this.movement.horizontal * 1.8 > 0 && this.x + this.movement.horizontal * 1.8 < canvas.width)
            this.x += this.movement.horizontal * 1.8 * this.speed;
        
        if(this.y + this.movement.vertical * 1.8 > 0 && this.y + this.movement.vertical * 1.8 < canvas.height)
            this.y += this.movement.vertical * 1.8 * this.speed;
    
        if(this.movement.horizontal > 0.1 || this.movement.horizontal < -0.1)
            this.movement.horizontal *= 0.985;
        else
            this.movement.horizontal = 0;
    
        if(this.movement.vertical > 0.1 || this.movement.vertical < -0.1)
            this.movement.vertical *= 0.985;
        else
            this.movement.vertical = 0;

        if(this.bullets.length > 0){
            for(let i = 0; i < this.bullets.length; i++){
                if(this.bullets[i].x < 0 || this.bullets[i].x > canvas.width || this.bullets[i].y < 0 || this.bullets[i].y > canvas.height){
                    this.bullets.splice(i, 1);
                    continue;
                }
                this.bullets[i].move();
                if(this.bullets[i].collideWithEnemy()){
                    this.bullets.splice(i, 1);
                }
            }
        }
    }

    damage() {
        if(this.shield){
            this.shield = false;
            return;
        }
        this.health--;
        if(this.health <= 0){
            this.health = 0;
        }
        for(let i = 0; i < 6; i++){
            setTimeout(() => {
                this.isHurt = !this.isHurt;
            }, i * 130);
        }
    }

    draw() {
        if(this.bullets.length > 0){
            for(let i = 0; i < this.bullets.length; i++){
                this.bullets[i].draw();
            }
        }

        //makes the player flash when hit
        if(!this.isHurt){
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.movement.rotation * Math.PI / 180);
            ctx.drawImage(this.sprite, -this.r, -this.r, this.r * 2, this.r * 2);
            if(this.shield){
                ctx.beginPath();
                ctx.arc(0, 0, this.r + 5, 0, 2 * Math.PI);
                ctx.strokeStyle = 'blue';
                ctx.stroke();
            }
            ctx.restore();
        }

        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        var startx = 5;
        var starty = 15;
        for(let i = 0; i < this.maxHealth; i++){
            //draws a heart
            ctx.beginPath();
            ctx.moveTo(startx + i * 20, starty);
            ctx.lineTo(startx + i * 20 + 10, starty + 20);
            ctx.lineTo(startx + i * 20 + 20, starty);
            ctx.moveTo(startx + i * 20 + 10, starty);
            ctx.arc(startx + i * 20 + 5, starty, 5, 0, Math.PI, true);
            ctx.moveTo(startx + i * 20 + 20, starty);
            ctx.arc(startx + i * 20 + 15, starty, 5, 0, Math.PI, true);
            ctx.fillStyle = 'grey';
            ctx.fill();
        }

        for(let i = 0; i < this.health; i++){
            //draws a heart
            ctx.beginPath();
            ctx.moveTo(startx + i * 20, starty);
            ctx.lineTo(startx + i * 20 + 10, starty + 20);
            ctx.lineTo(startx + i * 20 + 20, starty);
            ctx.moveTo(startx + i * 20 + 10, starty);
            ctx.arc(startx + i * 20 + 5, starty, 5, 0, Math.PI, true);
            ctx.moveTo(startx + i * 20 + 20, starty);
            ctx.arc(startx + i * 20 + 15, starty, 5, 0, Math.PI, true);
            ctx.fillStyle = 'red';
            ctx.fill();
        }

        //power up indicators
        if(this.hpUp){
            ctx.fillStyle = "red";
            ctx.fillText("HP", this.x - 10, this.y - 25);
        }
        if(this.speedUp){
            ctx.fillStyle = "green";
            ctx.fillText("Speed", this.x - 27, this.y - 25);
        }
        if(this.rateOfFireUp){
            ctx.fillStyle = "yellow";
            ctx.fillText("FireRate", this.x - 32, this.y - 25);
        }

        ctx.fillStyle = "white";
        ctx.fillText("Score : "+this.score, 5, 55);
        ctx.fillText("Time : "+Math.floor(totalGameTime), 5, 85);
    }

    enemyKilled(score){
        this.score += score;
        if(score > 0)
            this.health++;

        if(this.health > this.maxHealth){
            this.health = this.maxHealth;
        }
    }

    incHealth(){
        this.maxHealth++;
        this.health++;
        for(let i = 0; i < 6; i++){
            setTimeout(() => {
                this.hpUp = !this.hpUp;
            }, 130 * i);
        }
    }

    incSpeed(){
        this.speed+=.08;
        for(let i = 0; i < 6; i++){
            setTimeout(() => {
                this.speedUp = !this.speedUp;
            }, 130 * i);
        }
    }

    incRateOfFire(){
        this.bulletTimerMax-=.03;
        for(let i = 0; i < 6; i++){
            setTimeout(() => {
                this.rateOfFireUp = !this.rateOfFireUp;
            }, 130 * i);
        }
    }

    giveShield(){
        this.shield = true;
    }

}

class bullet {
    x = 0
    y = 0
    r = 3
    movement = {
        horizontal: 0,
        vertical: 0,
        rotation: 0
    }
    sprite = new Image()

    constructor(x, y, rotation, speed) {
        this.sprite.src = '/SpaceBattle/bullet.png';
        this.x = x
        this.y = y
        this.movement.rotation = rotation
        this.movement.horizontal = Math.cos((this.movement.rotation - 90) * Math.PI / 180) * speed
        this.movement.vertical = Math.sin((this.movement.rotation - 90) * Math.PI / 180) * speed
    }

    move() {
        this.x += this.movement.horizontal
        this.y += this.movement.vertical
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    collideWithEnemy() {
        for(let i = 0; i < enemies.length; i++){
            let distance = Math.sqrt(Math.pow(this.x - enemies[i].x, 2) + Math.pow(this.y - enemies[i].y, 2));
            if(distance < enemies[i].r){
                enemies[i].damage();
                return true;
            }
        }
        return false;
    }

    collideWithPlayer() {
        let distance = Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
        if(distance < p.r){
            p.damage();
            return true;
        }
        return false;
    }
}

//default enemy
//abstract class to have a base for all enemies
class enemy{
    x = 0
    y = 0
    r = 25
    speed = 1
    bullets = [];
    bulletTimer = 1;
    bulletTimerMax = 1;
    bulletSpeed = 5
    health = 1
    maxHealth = 1
    movement = {
        horizontal: 0,
        vertical: 0,
        rotation: 0
    }
    sprite = new Image()

    constructor() {
        let axis = Math.random() > 0.5 ? 'x' : 'y';
        if(axis == 'x'){
            this.x = Math.random() * canvas.width;
            this.y = Math.random() > 0.5 ? 0 : canvas.height;

            this.movement.rotation = this.y == 0 ? 180 : 0;
        }
        else{
            this.x = Math.random() > 0.5 ? 0 : canvas.width;
            this.y = Math.random() * canvas.height;

            this.movement.rotation = this.x == 0 ? 90 : 270;
        }

        this.movement.horizontal = Math.cos((this.movement.rotation - 90) * Math.PI / 180);
        this.movement.vertical = Math.sin((this.movement.rotation - 90) * Math.PI / 180);    
    }

    move() {
        this.x += this.movement.horizontal * this.speed;
        this.y += this.movement.vertical * this.speed;
    }

    shoot() {
        
    }

    damage() {
        this.health -= 1;
        if(this.health <= 0){
            this.die();
        }
    }

    async die(score) {
        p.enemyKilled(score);
        enemies.splice(enemies.indexOf(this), 1);
        deadEnemies.push(this);
        this.bullets = [];
        this.sprite.src = '/SpaceBattle/explosion.png';
        this.r = 15;
        await sleep(500);
        this.r = 25;
        await sleep(500);
        deadEnemies.splice(deadEnemies.indexOf(this), 1);
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.movement.rotation * Math.PI / 180);
        ctx.drawImage(this.sprite, -this.r, -this.r, this.r * 2, this.r * 2);
        ctx.restore();

        if(this.health > 0){
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x - this.r/2, this.y - this.r, this.r , 2);
            ctx.fillStyle = 'green';
            ctx.fillRect(this.x - this.r/2, this.y - this.r, this.r * (this.health / this.maxHealth), 2);
        }

        if(this.bullets.length > 0){
            for(let i = 0; i < this.bullets.length; i++){
                this.bullets[i].draw();
            }
        }
    }
}

class asteroid extends enemy{
    constructor() {
        super();
        this.r = Math.random() * 40 + 10;
        this.health = this.r/10;
        this.maxHealth = this.r/10;
        this.sprite.src = '/SpaceBattle/asteroid.png';
        this.speed = Math.random() * totalGameTime / 60 + 1;
    }

    die(score = 1) {
        super.die(score);
    }

    move() {
        super.move();
        if(this.collideWithPlayer()){
            p.damage();
            this.die(0);
        }
    }

    collideWithPlayer() {
        let distance = Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
        if(distance < p.r + this.r){
            return true;
        }
        return false;
    }
}

class normalEnemy extends enemy{
    constructor() {
        super();
        this.r = 25;
        this.health = 4;
        this.maxHealth = 4;
        this.sprite.src = '/SpaceBattle/redSpaceShip.png';
    }

    move(){
        super.move();
        if(this.bullets.length > 0){
            for(let i = 0; i < this.bullets.length; i++){
                this.bullets[i].move();
                if(this.bullets[i].collideWithPlayer()){
                    this.bullets.splice(i, 1);
                    i--;
                }
            }
        }
    }

    shoot(){
        this.bullets.push(new bullet(this.x, this.y, this.movement.rotation, this.bulletSpeed));
    }

    die() {
        super.die(2);
    }
}

class octoEnemy extends enemy{
    constructor() {
        super();
        this.r = 25;
        this.health = 6;
        this.maxHealth = 6;
        this.bulletTimerMax = 2.5;
        this.sprite.src = '/SpaceBattle/octoRedSpaceShip.png';
    }

    move(){
        super.move();
        if(this.bullets.length > 0){
            for(let i = 0; i < this.bullets.length; i++){
                this.bullets[i].move();
                if(this.bullets[i].collideWithPlayer()){
                    this.bullets.splice(i, 1);
                    i--;
                }
            }
        }
    }

    shoot(){
        for(let i = 0; i < 8; i++){
            this.bullets.push(new bullet(this.x, this.y, this.movement.rotation + i * 45, this.bulletSpeed));
        }
    }

    die() {
        super.die(3);
    }
}

class machineGunner extends enemy{
    constructor() {
        super();
        this.r = 25;
        this.health = 2;
        this.maxHealth = 2;
        this.sprite.src = '/SpaceBattle/machineGunnerShips.png';
    }

    move(){
        this.movement.rotation = Math.atan2(p.y - this.y, p.x - this.x) * 180 / Math.PI + 90;
        this.movement.horizontal = Math.cos((this.movement.rotation - 90) * Math.PI / 180);
        this.movement.vertical = Math.sin((this.movement.rotation - 90) * Math.PI / 180);
        this.x += this.movement.horizontal * this.speed;
        this.y += this.movement.vertical * this.speed;

        if(this.x < -50 || this.x > canvas.width + 50){
            this.die(0);
        }
        if(this.y < -50 || this.y > canvas.height + 50){
            this.die(0);
        }

        if(this.bullets.length > 0){
            for(let i = 0; i < this.bullets.length; i++){
                if(this.bullets[i].x < 0 || this.bullets[i].x > canvas.width || this.bullets[i].y < 0 || this.bullets[i].y > canvas.height){
                    this.bullets.splice(i, 1);
                    continue;
                }
                this.bullets[i].move();
                if(this.bullets[i].collideWithPlayer()){
                    this.bullets.splice(i, 1);
                }
            }
        }
    }

    async shoot(){
        for(let i = 0; i < 4; i++){
            await sleep(50);
            this.bullets.push(new bullet(this.x, this.y, this.movement.rotation, this.bulletSpeed));
        }
    }

    die() {
        super.die(4);
    }
}

//red - increase health
//green - increase speed
//blue - give shield
//yellow - increase rate of fire
class powerUp{

    constructor(x, y, type){
        this.x = x;
        this.y = y;
        this.r = 10;
        this.type = type;
        switch(type){
            case 0:
                this.color = 'red';
                break;
            case 1:
                this.color = 'green';
                break;
            case 2:
                this.color = 'blue';
                break;
            case 3:
                this.color = 'yellow';
                break;
            default:
                this.color = "red";
                break;
        }

    }

    pickUp(){
        switch(this.type){
            case 0:
                p.incHealth();
                break;
            case 1:
                p.incSpeed();
                break;
            case 2:
                p.giveShield();
                break;
            case 3:
                p.incRateOfFire();
                break;
            default:
                p.incHealth();
                break;
        }
        powerUps.splice(powerUps.indexOf(this), 1);
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r - this.r / 3, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        if(this.type == 0){
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        }else if(this.type == 1){
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        }else if(this.type == 2){
            ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        }else if(this.type == 3){
            ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
        }
        ctx.fill();
        ctx.closePath();
    }

    collideWithPlayer(){
        let distance = Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
        if(distance < p.r + this.r){
            return true;
        }
        return false;
    }
}

let p = new player();
const enemies = [];
const deadEnemies = [];
let eTimer = 0;
let started = false;
let gameClock = null;
let totalGameTime = 0;
let timeTracker = 0;
const powerUps = [];
let powerUpTimer = 0;

function main() {
    totalGameTime = 0;
    timeTracker = 0;
    eTimer = 0;
    gameClock = setInterval(update, 1000/60);
    p = new player();
    enemies.splice(0, enemies.length);
    stars.splice(0, stars.length);
    powerUps.splice(0, powerUps.length);
    powerUpTimer = 0;
    for(let i = 0; i < 100; i++){
        stars.push(new star());
    }
}

function update() {
    //updates total game time and adds to score every 10 seconds
    timeScore();

    //spawns powerups and checks if player picked one up
    powerUpsHandler();

    //spawn enemies
    spawnEnemies();

    //check if player is shooting
    checkPlayerShooting();

    //move enemies
    moveEnemies();

    //move player
    p.move();

    //draw everything
    draw();

    //check if player is dead
    if(p.health <= 0){
        gameOver();
    }
}

function timeScore(){
    totalGameTime += 1/60;
    if(totalGameTime - timeTracker > 10){
        timeTracker = totalGameTime;
        p.score += 5;
    }
}

function powerUpsHandler(){
    powerUpTimer += 1/60;
    if(powerUpTimer > 20){
        powerUps.push(new powerUp(Math.random() * canvas.width, Math.random() * canvas.height, Math.floor(Math.random() * 4)));
        powerUpTimer = 0 + Math.random() * 2.5;
    }

    for(let i = 0; i < powerUps.length; i++){
        if(powerUps[i].collideWithPlayer()){
            powerUps[i].pickUp();
        }
    }
}

let isMeteorShower = false;
function spawnEnemies() {
    eTimer -= 1/60;
    if(eTimer < 0){
        let randomChanceForMeteorShower = Math.floor(Math.random() * 100);
        if(randomChanceForMeteorShower < 2){
            for(let i = 0; i < 6; i++){
                setTimeout(()=>{
                    isMeteorShower = !isMeteorShower;
                }, 175 * i);
            }

            for(let i = 0; i < 12; i++){
                setTimeout(()=>{   
                    enemies.push(new asteroid());
                }, 200 * i + 1200);
            }
        }

        let num;
        if(totalGameTime < 30){
            num = Math.floor(Math.random() * 50);
        }else if(totalGameTime < 60){
            num = Math.floor(Math.random() * 75);
        }else if(totalGameTime < 120){
            num = Math.floor(Math.random() * 90);
        }else {
            num = Math.floor(Math.random() * 100);
        }
        let asteroidBound = 50;
        let normalEnemyBound = 75;
        let octoEnemyBound = 90;
        let machineGunnerBound = 100;

        if(num < asteroidBound){
            enemies.push(new asteroid());
        }else if(num < normalEnemyBound){
            enemies.push(new normalEnemy());
        }else if(num < octoEnemyBound){
            enemies.push(new octoEnemy());
        }else if(num < machineGunnerBound){
            enemies.push(new machineGunner());
        }
        
        eTimer = 4/(totalGameTime/100 + 1);
    }
}

function moveEnemies() {
    for(let i = 0; i < enemies.length; i++){
        enemies[i].move();
        enemies[i].bulletTimer -= 1/60;
        if(enemies[i].bulletTimer < 0){
            enemies[i].shoot();
            enemies[i].bulletTimer = enemies[i].bulletTimerMax;
        }
    }
}

function checkPlayerShooting() {
    p.bulletTimer += 1/60;
    if(keyMap['ArrowUp'] || keyMap[' ']){
        p.shoot();
    }
}

async function gameOver() {
    clearInterval(gameClock);
    gameClock = null;
    ctx.fillStyle = 'rgb(30, 30, 30)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '35px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText("Game Over", 200, 275);
    setHighScore();

    await sleep(1000);

    ctx.fillStyle = 'rgb(30, 30, 30)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '35px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText("Press any key to start", 135, 275);
    started = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const keyMap = {};
onkeydown = onkeyup = function(e){
    e.preventDefault();
    keyMap[e.key] = e.type == 'keydown';
    if(!started){
        started = true;
        main();
    }
}

const stars = [];
class star{
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }
}
function draw() {
    //background
    ctx.fillStyle = 'rgb(30, 30, 30)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    for(let i = 0; i < stars.length; i++){
        ctx.fillRect(stars[i].x, stars[i].y, 2, 2);
    }

    //player
    p.draw();

    //enemy
    for(let i = 0; i < enemies.length; i++){
        enemies[i].draw();
    }

    //dead enemies
    for(let i = 0; i < deadEnemies.length; i++){
        deadEnemies[i].draw();
    }

    //power ups
    for(let i = 0; i < powerUps.length; i++){
        powerUps[i].draw();
    }

    //Meteor Shower
    if(isMeteorShower){
        ctx.fillStyle = 'white';
        ctx.font = '35px Arial';
        ctx.fillText("Meteor Shower", 200, 275);
    }
}

ctx.fillStyle = 'rgb(30, 30, 30)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = '35px Arial';
ctx.fillStyle = 'white';
ctx.fillText("Press any key to start", 135, 275);

let highScore = 0;
async function GetHighScore()
{
    var temp = await getGameData("SpaceBattle");
    if(temp != null)
    {
        highScore = temp;
        document.getElementById("highScore").innerHTML = "High Score : " + highScore;
    }
    console.log(temp);
    return temp;
}

function setHighScore(){
    if(p.score > highScore){
        highScore = p.score;
        document.getElementById("highScore").innerHTML = "High Score : " + highScore;
        postGameData("SpaceBattle", highScore);
    }
}

GetHighScore();