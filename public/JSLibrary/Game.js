class Game{
    // canvas: canvas element
    // start: function called once at the start of the game
    // update: function called every frame
    constructor(canvas, start = function(){}, update = function(){}){
        this.OBJECTS = [];
        this.CANVAS = canvas;
        this.GRAPHICS = new Graphics(canvas, this.OBJECTS);
        this.START = start;
        this.UPDATE = update;
    }

    Start(){
        this.GRAPHICS.fullScreen();
        this.START();
        //console.log("Start");
        setInterval(() => this.Update(), 1000 / 60);
    }
    
    Update(){
        this.UPDATE();
        //console.log("Update");

        for(let i = 0; i < this.OBJECTS.length; i++){
            if(typeof this.OBJECTS[i].update === "function")
                this.OBJECTS[i].update();
        }
    
        this.GRAPHICS.render();
    }

    addObject(object){
        this.OBJECTS.push(object);
        this.OBJECTS.sort((a, b) => a.renderOrder - b.renderOrder);
    }

    removeObject(object){
        for(let i = 0; i < this.OBJECTS.length; i++){
            if(this.OBJECTS[i] == object){
                this.OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}