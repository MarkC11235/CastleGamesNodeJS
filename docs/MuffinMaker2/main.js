//the problem with the page not loading could also be here(not sure)
let muffins = 0;

function loop(){
    muffins += production.totalProdPerSec;   
}

setInterval(loop, 1000);

//save and load