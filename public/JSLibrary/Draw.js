function Triangle(ctx, x, y, fill)
{
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+10,y);
    ctx.lineTo(x,y+10);
    ctx.lineTo(x,y);
    if(fill)
        ctx.fill();
    else
        ctx.stroke();
}

function Circle(ctx, x, y, rad, fill, color)
{
    ctx.beginPath();
    ctx.arc(x,y,rad,0,2*Math.PI,true);
    if(fill)
        {
            ctx.fillStyle = color;
            ctx.fill();
        }
    else
        ctx.stroke();
}

function Rectangle(ctx, x, y, w, h, fill, color)
{
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    if(fill)
        {
            ctx.fillStyle = color;
            ctx.fill();
        }
    else
        ctx.stroke();
}

//draw the graph of a function
function drawGraph(ctx, func, xMin, xMax, yMin, yMax, color)
{
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(xMin + 300, 300 - func.eval(xMin));
    var currentY = func.eval(xMin);
    var nextY;
    for(var x = xMin; x <= xMax; x += 0.1)
    {
        nextY = func.eval(x);
        if(Math.abs(nextY - currentY) > 10)
        {
            ctx.moveTo(x + 300, 300 - func.eval(x))
        }
        else{
            ctx.lineTo(x + 300, 300 - func.eval(x));
        }
    }
    ctx.stroke();
}

