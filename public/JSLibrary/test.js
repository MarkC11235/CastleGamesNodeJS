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

let player = new Player(100, 100, 50, 50, "red", 5, 1);
let wall = new Rectangle(0, 0, 100, 100, "white");
let circle = new Circle(300, 300, 50, "blue");
// let p2 = new newplayer(600, 200, 50, 50, "green", 5, 1);
function Start(){
    GAME.addObject(player);
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