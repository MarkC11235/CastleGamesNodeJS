// this.x and this.y is the top left corner of the object
class Object{
    constructor(x = 0, y = 0, color = "white", renderOrder = 0){
        this.x = x;
        this.y = y;
        this.color = color;
        this.renderOrder = renderOrder;
    }

    //object object collisions don't need to be normalized(I did the math to double check that it would work the same way)
    static collision(object1, object2){
        if((object1 instanceof Rectangle || object1 instanceof Player) && (object2 instanceof Rectangle || object2 instanceof Player)){
            return Object.rectRectCollision(object1, object2);
        }

        if(object1 instanceof Circle && object2 instanceof Circle){
            return Object.circleCircleCollision(object1, object2);
        }

        if((object1 instanceof Rectangle || object1 instanceof Player) && object2 instanceof Circle){
            return Object.rectCircleCollision(object1, object2);
        }

        if(object1 instanceof Circle && (object2 instanceof Rectangle || object2 instanceof Player)){
            return Object.rectCircleCollision(object2, object1);
        }
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
            return Object.rectWallCollision(object);
        }

        if(object instanceof Circle){
            return Object.circleWallCollision(object);
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

class Rectangle extends Object{
    constructor(x = 0, y = 0, width = 0, height = 0, color = "white", renderOrder = 0){
        super(x, y, color, renderOrder);
        this.width = width;
        this.height = height;
    }
}

class Circle extends Object{
    constructor(x = 0, y = 0, radius = 0, color = "white", renderOrder = 0){
        super(x, y, color, renderOrder);
        this.radius = radius;
    }
}

class Img extends Object{
    constructor(x = 0, y = 0, width = 0, height = 0, img = new Image(), imgSrc = ""){
        super(x, y);
        this.width = width;
        this.height = height;
        this.img = img;
        this.img.src = imgSrc;
    }
}

class Moveable extends Object{
    constructor(x = 0, y = 0, color = "white", renderOrder = 0, speed = 5){
        super(x, y, color, renderOrder);
        this.speed = speed;
    }

    update(){
        this.move();
    }
    
    move(){
        // Override this function
    }

    checkCollision(){
        //Collision with walls
        Object.wallCollision(this);

        //Collision with other objects
        for(let i = 0; i < GAME.OBJECTS.length; i++){
            if(this != GAME.OBJECTS[i]){
                if(Object.collision(this, GAME.OBJECTS[i])){
                    // this.onCollision(GAME.objects[i]);
                    //console.log("Collision");
                    return true;
                }
            }
        }
        return false;
    }
}

class Player extends Moveable{
    constructor(x = 0, y = 0, width = 0, height = 0, color = "white", speed = 5, renderOrder = 0){
        super(x, y, color, renderOrder, speed);
        this.width = width;
        this.height = height;
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
        this.x += moveDir.x;
        this.y += moveDir.y;

        if(this.checkCollision()){
            this.x -= moveDir.x;
            this.y -= moveDir.y;
        }
    }
}

