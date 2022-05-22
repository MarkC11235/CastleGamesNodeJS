// make class to construct objects for a game that use physics 
const gravity = -0.1;

class object{
    constructor(x,y,width,height,color,xVel,yVel,xAcc,yAcc,xFric,yFric,mass,type){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.xVel = xVel;
        this.yVel = yVel;
        this.xAcc = xAcc;
        this.yAcc = yAcc;
        this.xFric = xFric;
        this.yFric = yFric;
        this.mass = mass;
        this.type = type;
    }
    //draw object
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
    //update object
    update(){
        //update velocity
        this.xVel += this.xAcc;
        this.yVel += this.yAcc + gravity;
        //update friction
        this.xVel *= this.xFric;
        this.yVel *= this.yFric;
        //update position
        this.x += this.xVel;
        this.y -= this.yVel;
    }
    //make function to check for collisions
    //if there is a collision prevent the object from moving into the other object
    collision(other){
        //check if the objects are touching
        if(this.x < other.x + other.width &&
           this.x + this.width > other.x &&
           this.y < other.y + other.height &&
           this.height + this.y > other.y){
            //check if the objects are overlapping
            if(this.x < other.x){
                this.x = other.x - this.width - other.width;
            }
            else if(this.x + this.width > other.x + other.width){
                this.x = other.x + other.width + this.width;
            }
            if(this.y < other.y){
                this.y = other.y - this.height - other.height;
            }
            else if(this.y + this.height > other.y + other.height){
                this.y = other.y + other.height + this.height;
            }
        }
    }

    
}
