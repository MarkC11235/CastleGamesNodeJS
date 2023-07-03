//there will be a a black rectangle that covers the whole screen
//and then a square screen that is always in the middle of the screen
//units that are used are always going to be 1000x1000 no matter the size of the screen
class Graphics{
    static UNITS = 1000;
    
    constructor(canvas, objects, background = "grey"){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.background = background;

        this.objects = objects;

        document.addEventListener("keydown", function(event){
            if(event.key == "f"){
                this.fullScreen();
            }
            if(event.key == "Escape"){
                this.exitFullScreen();
            }
        }
        .bind(this));

        window.addEventListener("resize", function(event){
            this.resize(window.innerWidth, window.innerHeight);
        }
        .bind(this));

        this.drawingArea = new Rectangle(0, 0, 0, 0);
        //console.log(this.drawingArea);
    }

    resize(width, height){
        if(width > height){
            this.canvas.width = width;
            this.canvas.height = height;
            this.drawingArea = new Rectangle((width - height) / 2, 0, height, height); 
        }
        else{
            this.canvas.width = width;
            this.canvas.height = height;
            this.drawingArea = new Rectangle(0, (height - width) / 2, width, width);
        }
        //console.log("resize");
        //console.log(this.canvas.width, this.canvas.height);
        //console.log(this.drawingArea);
    }

    normalize(num){
        return (num / Graphics.UNITS) * this.drawingArea.width;
    }

    fullScreen(){
        this.resize(window.innerWidth, window.innerHeight);
        this.canvas.style.position = "absolute";
        this.canvas.style.left = window.scrollX + "px";
        this.canvas.style.top = window.scrollY + "px";
        //remove scrollbars
        document.body.style.overflow = "hidden";

        //this.render();
    }

    exitFullScreen(){
        this.resize(0, 0);
        this.canvas.style.position = "static";
        this.canvas.style.left = "0px";
        this.canvas.style.top = "0px";
        //add scrollbars
        document.body.style.overflow = "auto";
    }

    drawRect(x, y, width, height, color){
        this.ctx.fillStyle = color;
        let x1 = this.normalize(x) + this.drawingArea.x;
        let y1 = this.normalize(y) + this.drawingArea.y;
        let width1 = this.normalize(width);
        let height1 = this.normalize(height);
        // console.log(x, y, width, height);
        // console.log(x1, y1, width1, height1);
        this.ctx.fillRect(x1, y1, width1, height1);
        //console.log(this.normalize(x) + this.drawingArea.x, this.normalize(y) + this.drawingArea.y, this.normalize(width), this.normalize(height));
    }

    drawCircle(x, y, radius, color){
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(this.normalize(x) + this.drawingArea.x, this.normalize(y) + this.drawingArea.y, this.normalize(radius), 0, 2 * Math.PI);
        this.ctx.fill();
    }

    drawImage(img, x, y, width, height){
        let x1 = this.normalize(x) + this.drawingArea.x - this.normalize(width) / 2;
        let y1 = this.normalize(y) + this.drawingArea.y - this.normalize(height) / 2;
        let width1 = this.normalize(width);
        let height1 = this.normalize(height);

        this.ctx.drawImage(img, x1, y1, width1, height1);
    }

    drawObject(object){
        if(object instanceof Rectangle){
            this.drawRect(object.x, object.y, object.width, object.height, object.color);
        }

        if(object instanceof Circle){
            this.drawCircle(object.x, object.y, object.radius, object.color);
        }

        if(object instanceof Img){
            this.drawImage(object.img, object.x, object.y, object.width, object.height);
        }

        if(object instanceof Player){
            this.drawRect(object.x, object.y, object.width, object.height, object.color);
        }
    }

    clear(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = this.background;
        //console.log(this.drawingArea);
        this.ctx.fillRect(this.drawingArea.x, this.drawingArea.y, this.drawingArea.width, this.drawingArea.height);
    }

    clearSides(){
        if(this.canvas.width > this.canvas.height){
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, (this.canvas.width - this.drawingArea.width) / 2, this.canvas.height);
            this.ctx.fillRect(this.canvas.width - (this.canvas.width - this.drawingArea.width) / 2, 0, (this.canvas.width - this.drawingArea.width) / 2, this.canvas.height);
            
        }
        else{
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.canvas.width, (this.canvas.height - this.drawingArea.height) / 2);
            this.ctx.fillRect(0, this.canvas.height - (this.canvas.height - this.drawingArea.height) / 2, this.canvas.width, (this.canvas.height - this.drawingArea.height) / 2);
        }
    }

    render(){
        this.clear();

        for(let i = 0; i < this.objects.length; i++){
            this.drawObject(this.objects[i]);
        }

        //keep this line at the end so that it will cut off anything that is outside of the drawing area
        this.clearSides();
        //console.log("rendered");
    }
}