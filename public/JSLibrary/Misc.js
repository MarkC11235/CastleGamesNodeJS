class Vector{
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    magnitude(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize(){
        let mag = this.magnitude();
        if(mag == 0)
            return;
        this.x /= mag;
        this.y /= mag;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }

    dot(v){
        return this.x * v.x + this.y * v.y;
    }

    static add(v1, v2){
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static subtract(v1, v2){
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
}

const keyMap = {};
onkeydown = onkeyup = function(e){
    keyMap[e.key] = e.type == 'keydown';
    //console.log(keyMap);
}

function isKeyDown(key){
    return keyMap[key];
}

function isKeyUp(key){
    return !keyMap[key];
}