// this.x and this.y is the top left corner of the object
class GameObject{
    constructor(x = 0, y = 0, color = "white", renderOrder = 0, img = new Image(), imgSrc = ""){
        this.x = x;
        this.y = y;
        this.color = color;
        this.renderOrder = renderOrder;
        this.img = img;
        this.img.src = imgSrc;
    }

    draw(){

    }

    //object object collisions don't need to be normalized(I did the math to double check that it would work the same way)
    static collision(object1, object2){
        if(object1 == object2)
            return false;

        if(object1 instanceof Rectangle){
            if(object2 instanceof Rectangle){
                return GameObject.rectRectCollision(object1, object2);
            }
            if(object2 instanceof Circle){
                return GameObject.rectCircleCollision(object1, object2);
            }
        }

        if(object1 instanceof Circle){
            if(object2 instanceof Rectangle){
                return GameObject.rectCircleCollision(object2, object1);
            }
            if(object2 instanceof Circle){
                return GameObject.circleCircleCollision(object1, object2);
            }
        }

        return false;
    }

    static rectRectCollision(rect1, rect2){
        if(rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y){
                return true;
            }
        return false;
    }

    static circleCircleCollision(circle1, circle2){
        let dx = circle1.x - circle2.x;
        let dy = circle1.y - circle2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if(distance < circle1.radius + circle2.radius){
            return true;
        }
        return false;
    }

    static rectCircleCollision(rect, circle){
        let dx = circle.x - Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        let dy = circle.y - Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
        if((dx * dx + dy * dy) < (circle.radius * circle.radius)){
            return true;
        }
        return false;
    }

    //wall is the edge of the screen
    //use the Graphics.UNITS constant to get the size of the screen and make the "wall"
    static wallCollision(object){
        if(object instanceof Rectangle || object instanceof Player){
            return GameObject.rectWallCollision(object);
        }

        if(object instanceof Circle){
            return GameObject.circleWallCollision(object);
        }
    }

    static rectWallCollision(rect){
        if(rect.x < 0){
            rect.x = 0;
        }
        if(rect.x + rect.width > Graphics.UNITS){
            rect.x = Graphics.UNITS - rect.width;
        }
        if(rect.y < 0){
            rect.y = 0;
        }
        if(rect.y + rect.height > Graphics.UNITS){
            rect.y = Graphics.UNITS - rect.height;
        }
    }

    static circleWallCollision(circle){
        if(circle.x - circle.radius < 0){
            circle.x = circle.radius;
        }
        if(circle.x + circle.radius > Graphics.UNITS){
            circle.x = Graphics.UNITS - circle.radius;
        }
        if(circle.y - circle.radius < 0){
            circle.y = circle.radius;
        }
        if(circle.y + circle.radius > Graphics.UNITS){
            circle.y = Graphics.UNITS - circle.radius;
        }
    }

}

class Rectangle extends GameObject{
    constructor(x = 0, y = 0, width = 0, height = 0, color = "white", img = new Image(), imgSrc = "", renderOrder = 0){
        super(x, y, color, renderOrder, img, imgSrc);
        this.width = width;
        this.height = height;
    }

    draw(ctx){
        ctx.fillStyle = this.color;

        let x1 = GAME.GRAPHICS.normalize(this.x) + GAME.GRAPHICS.drawingArea.x;
        let y1 = GAME.GRAPHICS.normalize(this.y) + GAME.GRAPHICS.drawingArea.y;
        let width1 = GAME.GRAPHICS.normalize(this.width);
        let height1 = GAME.GRAPHICS.normalize(this.height);

        ctx.fillRect(x1, y1, width1, height1);

        if(this.imgSrc != ""){
            ctx.drawImage(this.img, x1, y1, width1, height1);
        }
    }
}

class Circle extends GameObject{
    constructor(x = 0, y = 0, radius = 0, color = "white", img = new Image(), imgSrc = "", renderOrder = 0){
        super(x, y, color, renderOrder, img, imgSrc);
        this.radius = radius;
    }

    draw(ctx){
        ctx.fillStyle = this.color;

        let x1 = GAME.GRAPHICS.normalize(this.x) + GAME.GRAPHICS.drawingArea.x;
        let y1 = GAME.GRAPHICS.normalize(this.y) + GAME.GRAPHICS.drawingArea.y;
        let radius1 = GAME.GRAPHICS.normalize(this.radius);

        ctx.beginPath();
        ctx.arc(x1, y1, radius1, 0, 2 * Math.PI);
        ctx.fill();

        if(this.imgSrc != ""){
            let shift = radius1 / Math.sqrt(2);
            ctx.drawImage(this.img, x1 - shift, y1 - shift, shift * 2, shift * 2);
        }
    }
}



class Moveable{
    constructor(x = 0, y = 0, speed = 5, shape = "rectangle", size = 10, color = "white", img = new Image(), imgSrc = "", renderOrder = 0){
        this.speed = speed;
        if(shape == "rectangle"){
            this.shape = new Rectangle(x, y, size, size, color, img, imgSrc, renderOrder);
        }
        else if(shape == "circle"){
            this.shape = new Circle(x, y, size, color, img, imgSrc, renderOrder);
        }
        else{
            console.log("Invalid shape");
        }
        this.isColliding = false;
    }

    update(){
        this.move();
    }
    
    move(){
        // Override this function
    }

    draw(ctx){
        this.shape.draw(ctx);
    }

    checkCollision(){
        //Collision with walls
        GameObject.wallCollision(this.shape);

        //Collision with other objects
        for(let i = 0; i < GAME.OBJECTS.length; i++){
            if(this != GAME.OBJECTS[i]){
                let collision = GameObject.collision(this.shape, GAME.OBJECTS[i]?.shape ? GAME.OBJECTS[i].shape : GAME.OBJECTS[i]);
                if(collision){
                    // this.onCollision(GAME.objects[i]);
                    //console.log("Collision");
                    this.isColliding = true;
                    return true;
                }
            }
        }
        this.isColliding = false;
        return false;
    }
}

class Player extends Moveable{
    constructor(x = 0, y = 0, speed = 5, shape = "rectangle", size = 10, color = "white", img = new Image(), imgSrc = "", renderOrder = 0){
        super(x, y, speed, shape, size, color, img, imgSrc, renderOrder);
    }

    // Override this function
    move(){
        let moveDir = new Vector(0, 0);
        if(keyMap["w"]){
            moveDir.y -= 1;
        }
        if(keyMap["a"]){
            moveDir.x -= 1;
        }
        if(keyMap["s"]){
            moveDir.y += 1;
        }
        if(keyMap["d"]){
            moveDir.x += 1;
        }
        moveDir.normalize();
        moveDir.x *= this.speed;
        moveDir.y *= this.speed;
        this.shape.x += moveDir.x;

        if(this.checkCollision()){
            this.shape.x -= moveDir.x;
        }

        this.shape.y += moveDir.y;

        if(this.checkCollision()){
            this.shape.y -= moveDir.y;
        }
    }
}

class Enemy extends Moveable{
    constructor(x = 0, y = 0, speed = 5, shape = "rectangle", size = 10, color = "white", img = new Image(), imgSrc = "", renderOrder = 0, moveFunc = function(){}){
        super(x, y, speed, shape, size, color, img, imgSrc, renderOrder);
        this.moveFunc = moveFunc;
    }

    // Override this function
    move(){
        //should return a vector with the direction to move
        let moveDir = this.moveFunc();
        moveDir.normalize();
        moveDir.x *= this.speed;
        moveDir.y *= this.speed;

        this.shape.x += moveDir.x;

        if(this.checkCollision()){
            this.shape.x -= moveDir.x;
        }

        this.shape.y += moveDir.y;

        if(this.checkCollision()){
            this.shape.y -= moveDir.y;
        }
    }
}

