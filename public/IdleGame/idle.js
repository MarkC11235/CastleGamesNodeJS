var canvas = document.getElementById("clickScreen");
var ctx = canvas.getContext("2d");
//canvas.style.border = "1px solid black";

var muffin = {
    img : new Image(),
    x : 75,
    y : 30,
    w : 150,
    h : 150,
}
muffin.img.src = "images/MuffinMaker.gif";

canvas.addEventListener("click", async function(event) {
    event.preventDefault();
    muffins+=(ovens + 1) + (powerClick * 50000000);
    UpdateTexts();
    if(muffins%10 == 0)
    {
        miniMuffins.push(new miniMuffin(Math.random()*(canvas.width), canvas.height, 30, 30));
    }
    muffin.w = 174;
    muffin.h = 174;
    muffin.x = 63;
    muffin.y = 18;
    await sleep(250);
    muffin.w = 150;
    muffin.h = 150;
    muffin.x = 75;
    muffin.y = 30;
});
canvas.addEventListener("dblclick", function(event) {
    event.preventDefault();
});

class miniMuffin{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw(){
        ctx.drawImage(muffin.img, this.x, this.y, this.w, this.h);
        this.y--;
        if(this.y < -10)
            miniMuffins.shift();
    }   
}

var miniMuffins = [];

var muffins = ((localStorage.getItem("muffins") == null || localStorage.getItem("muffins") == NaN) ? 0 : parseInt(localStorage.getItem("muffins")));
var muffinsText = document.getElementById("muffins");
var previousMuffins = 0;

var muffinsPerSecond = 0;
var muffinsPerSecondText = document.getElementById("muffinsPerSecond");

function Clear()
{
    localStorage.clear();
    window.location.reload();
}
async function Start()
{
    console.log("Started");
    setInterval(Save, 2000);
    setInterval(Update, 1000);
    setInterval(Draw, 1000/60);
    await sleep(1000);
    UpdateTexts();
}

function Save()
{
    localStorage.setItem("muffins", muffins);

    //muffin production
    localStorage.setItem("bakers", bakers);
    localStorage.setItem("gourmetChef", gourmetChefs);
    localStorage.setItem("muffinShops", muffinShops);
    localStorage.setItem("muffinFactory", muffinFactory);
    localStorage.setItem("muffinFarm", muffinFarm);
    localStorage.setItem("muffinCity", muffinCity);
    localStorage.setItem("muffinMine", muffinMine);
    localStorage.setItem("muffinEmpire", muffinEmpire);
    localStorage.setItem("muffinPlanet", muffinPlanet);
    localStorage.setItem("muffinSolarSystem", muffinSolarSystem);
    localStorage.setItem("muffinGalaxy", muffinGalaxy);
    localStorage.setItem("muffinUniverse", muffinUniverse);

    //upgrades
    localStorage.setItem("ovens", ovens);
    localStorage.setItem("betterTraining", betterTraining);
    localStorage.setItem("chocolateChipMuffinRecipe", chocolateChipMuffinRecipe);
    localStorage.setItem("fiveStarChefs", fiveStarChefs);
    localStorage.setItem("betterIngredients", betterIngredients);
    localStorage.setItem("managers", managers);
    localStorage.setItem("farmHands", farmHands);
    localStorage.setItem("betterTools", betterTools);
    localStorage.setItem("muffinMonopoly", muffinMonopoly);
    localStorage.setItem("powerClick", powerClick);
    localStorage.setItem("spaceShip", spaceShip);
    localStorage.setItem("multiverse", multiverse);

}

function UpdateTexts()
{
    muffinsText.innerHTML = "Muffins : "+muffins.toLocaleString("en-US");
    muffinsPerSecondText.innerHTML = "Muffins/sec : "+muffinsPerSecond.toLocaleString("en-US");

    //muffin production
    muffinShopText.innerHTML = "Muffin Shops : "+muffinShops.toLocaleString("en-US") + " ("+muffinShopCost.toLocaleString("en-US")+" muffins)";   
    bakerText.innerHTML = "Bakers : "+bakers.toLocaleString("en-US") + " ("+bakerCost.toLocaleString("en-US")+" muffins)";
    gourmetChefText.innerHTML = "Gourmet Chefs : "+gourmetChefs.toLocaleString("en-US") + " ("+gourmetChefCost.toLocaleString("en-US")+" muffins)";
    muffinFactoryText.innerHTML = "Muffin Factories : "+muffinFactory.toLocaleString("en-US") + " ("+muffinFactoryCost.toLocaleString("en-US")+" muffins)";
    muffinFarmText.innerHTML = "Muffin Farms : "+muffinFarm.toLocaleString("en-US") + " ("+muffinFarmCost.toLocaleString("en-US")+" muffins)";
    muffinCityText.innerHTML = "Muffin City : "+muffinCity.toLocaleString("en-US") + " ("+muffinCityCost.toLocaleString("en-US")+" muffins)";
    muffinMineText.innerHTML = "Muffin Mines : "+muffinMine.toLocaleString("en-US") + " ("+muffinMineCost.toLocaleString("en-US")+" muffins)";
    muffinEmpireText.innerHTML = "Muffin Empires : "+muffinEmpire.toLocaleString("en-US") + " ("+muffinEmpireCost.toLocaleString("en-US")+" muffins)";
    muffinPlanetText.innerHTML = "Muffin Planets : "+muffinPlanet.toLocaleString("en-US") + " ("+muffinPlanetCost.toLocaleString("en-US")+" muffins)";
    muffinSolarSystemText.innerHTML = "Muffin Solar Systems : "+muffinSolarSystem.toLocaleString("en-US") + " ("+muffinSolarSystemCost.toLocaleString("en-US")+" muffins)";
    muffinGalaxyText.innerHTML = "Muffin Galaxies : "+muffinGalaxy.toLocaleString("en-US") + " ("+muffinGalaxyCost.toLocaleString("en-US")+" muffins)";
    muffinUniverseText.innerHTML = "Muffin Universes : "+muffinUniverse.toLocaleString("en-US") + " ("+muffinUniverseCost.toLocaleString("en-US")+" muffins)";

    //upgrades
    ovenText.innerHTML = "Ovens : "+ovens.toLocaleString("en-US") + " ("+ovenCost.toLocaleString("en-US")+" muffins) <br> Increases muffins perclick by 1";
    betterTrainingText.innerHTML = "Better Training : "+betterTraining.toLocaleString("en-US")+ " ("+betterTrainingCost.toLocaleString("en-US")+" muffins) <br> Increases muffins made by bakers";
    chocolateChipMuffinRecipeText.innerHTML = "Chocolate Chip Muffin Recipe : "+(chocolateChipMuffinRecipe ? "Purchased" : "20,000 muffins") + " <br> Doubles muffins/sec";
    fiveStarChefsText.innerHTML = "Five Star Chefs : "+ (fiveStarChefs ? "Purchased" : "100,000 muffins")+" <br> Increases muffins made by gourmet chefs";
    betterIngredientsText.innerHTML = "Better Ingredients : "+(betterIngredients ? "Purchased" : "2,000,000 muffins") + " <br> Quadruples muffins/sec";
    managersText.innerHTML = "Managers : "+managers.toLocaleString("en-US") + " ("+managerCost.toLocaleString("en-US")+" muffins) <br> Increases muffins made by muffin factories";
    farmHandsText.innerHTML = "Farm Hands : "+farmHands.toLocaleString("en-US") + " ("+farmHandCost.toLocaleString("en-US")+" muffins) <br> Increases muffins made by muffin farms";
    betterToolsText.innerHTML = "Better Tools : "+ (betterTools ? "Purchased" : "8,000,000,000 muffins")+" <br> Increases muffins made by muffin mines";
    muffinMonopolyText.innerHTML = "Muffin Monopoly : "+(muffinMonopoly ? "Purchased" : "10,000,000,000 muffins") + " <br> 10x muffins/sec";
    powerClickText.innerHTML = "Power Click : " + powerClick.toLocaleString("en-US") + " ("+powerClickCost.toLocaleString("en-US")+" muffins) <br> more muffins per click";
    spaceShipText.innerHTML = "Space Ship : "+ (spaceShip ? "Purchased" : "1,000,000,000,000 muffins")+" <br> Allows you to buy things in space";
    multiverseText.innerHTML = "Multiverse : "+ (multiverse ? "Purchased" : "2,000,000,000,000,000,000,000 muffins")+" <br> Allows you to buy more universes";
}

function Update()
{
    previousMuffins = muffins;
    muffins += (bakers * (betterTraining + 1) + (gourmetChefs * 10) * (fiveStarChefs ? 2 : 1)
    + muffinShops * 100 + muffinFactory * 1000 * (managers * .4 + 1) + muffinFarm * 15000 * (farmHands * .4 + 1)
    + muffinCity * 200000 + (muffinMine * 5000000) * (betterTools ? 2 : 1)+ muffinEmpire * 1000000000 + muffinPlanet * 20000000000
    + muffinSolarSystem * 2500000000000 + muffinGalaxy * 2000000000000000 + muffinUniverse * 5000000000000000000)
    * (chocolateChipMuffinRecipe ? 2 : 1) * (betterIngredients ? 4 : 1) * (muffinMonopoly ? 10 : 1);

    muffinsPerSecond = muffins - previousMuffins;
    
    for(var i = 0; i < (muffinsPerSecond > 0 ? 2 : 0); i++)
    {
        miniMuffins.push(new miniMuffin(Math.random()*(canvas.width), canvas.height, 30, 30));
    }
    UpdateTexts();
}

function Draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < miniMuffins.length; i++)
    {
        miniMuffins[i].draw();
    }
    ctx.drawImage(muffin.img, muffin.x, muffin.y, muffin.w, muffin.h);
}

function sleep(time)
{
    return new Promise(resolve => setTimeout(resolve, time));
}

window.onload = Start();
document.addEventListener('contextmenu', event => event.preventDefault());