let muffins = 0;

function loop(){
    muffins += production.totalProdPerSec;   
}

setInterval(loop, 1000);