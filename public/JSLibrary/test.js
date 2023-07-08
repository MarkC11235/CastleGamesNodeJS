//CAN EXTEND GAMEOBJECTS AND ADD THEM TO THE GAME
// class newplayer extends Player{
//     constructor(x, y, width, height, color, speed, renderOrder){
//         super(x, y, width, height, color, speed, renderOrder);
//     }

//     update(){
//         console.log("newplayer");
//     }
// }

const CANVAS = document.getElementById("canvas");

let player = new Player(200, 100, 5, "rectangle", 50, "green", new Image(), "/images/controller.png", 1);

function enemyMove(){
    let moveDir = new Vector(-1, -1);
    moveDir.normalize();

    moveDir.x *= this.speed;
    moveDir.y *= this.speed;
    this.shape.x += moveDir.x;
    this.shape.y += moveDir.y;

    if(this.checkCollision()){
        this.shape.x -= moveDir.x;
        this.shape.y -= moveDir.y;
    }
}
let enemy = new Enemy(400, 400, 1, "circle", 25, "red", new Image(), "/images/leaf.png", 1, enemyMove);
let wall = new Rectangle(0, 0, 100, 100, "white", new Image(), "/images/leaf.png", 1);
let circle = new Circle(300, 300, 50, "blue", new Image(), "/images/shiningStar.png", 1);
// let p2 = new newplayer(600, 200, 50, 50, "green", 5, 1);
function Start(){
    GAME.addObject(player);
    GAME.addObject(enemy);
    GAME.addObject(wall);
    GAME.addObject(circle);
    //GAME.addObject(p2);
}

let timer = 0;
function Update(){
    timer += 1;
    if(timer % 60 == 0){
        //GAME.addObject(new Rectangle(Math.random() * 1000, Math.random() * 1000, 20, 20, "white"));
    }
}


const GAME = new Game(CANVAS, Start, Update);
GAME.Start();