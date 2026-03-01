//upgrades

var ovens = (localStorage.getItem("ovens") == null ? 0 : parseInt(localStorage.getItem("ovens")));
var ovenCost = Math.floor(100 * Math.pow(1.8, ovens));
var ovenText = document.getElementById("ovens");

function BuyOvens()
{
    if(muffins >= ovenCost)
    {
        muffins -= ovenCost;
        ovenCost = Math.floor(ovenCost * 1.8);
        ovens++;
        UpdateTexts();
    }
}

var betterTraining = (localStorage.getItem("betterTraining") == null ? 0 : parseInt(localStorage.getItem("betterTraining")));
var betterTrainingCost = Math.floor(1000 * Math.pow(1.8, betterTraining));
var betterTrainingText = document.getElementById("betterTraining");

function BuyBetterTraining()
{
    if(muffins >= betterTrainingCost)
    {
        muffins -= betterTrainingCost;
        betterTrainingCost = Math.floor(betterTrainingCost * 1.8);
        betterTraining++;
        UpdateTexts();
    }
}

var chocolateChipMuffinRecipe = (localStorage.getItem("chocolateChipMuffinRecipe") == null ? false : localStorage.getItem("chocolateChipMuffinRecipe") == "true" ? true : false);
var chocolateChipMuffinRecipeText = document.getElementById("chocolateChipMuffinRecipe");

function BuyChocolateChipMuffinRecipe()
{
    if(muffins >= 20000 && !chocolateChipMuffinRecipe)
    {
        muffins -= 20000;
        chocolateChipMuffinRecipe = true;
        UpdateTexts();
    }
}

var fiveStarChefs = (localStorage.getItem("fiveStarChefs") == null ? false : localStorage.getItem("fiveStarChefs") == "true" ? true : false);
var fiveStarChefsText = document.getElementById("fiveStarChefs");

function BuyFiveStarChefs()
{
    if(muffins >= 100000 && !fiveStarChefs)
    {
        muffins -= 100000;
        fiveStarChefs = true;
        UpdateTexts();
    }
}

var managers = (localStorage.getItem("managers") == null ? 0 : parseInt(localStorage.getItem("managers")));
var managerCost = Math.floor(500000 * Math.pow(1.8, managers));
var managersText = document.getElementById("managers");

function BuyManagers()
{
    if(muffins >= managerCost)
    {
        muffins -= managerCost;
        managerCost = Math.floor(managerCost * 1.8);
        managers++;
        UpdateTexts();
    }
}

var betterIngredients = (localStorage.getItem("betterIngredients") == null ? false : localStorage.getItem("betterIngredients") == "true" ? true : false);
var betterIngredientsText = document.getElementById("betterIngredients");

function BuyBetterIngredients()
{
    if(muffins >= 2000000 && !betterIngredients)
    {
        muffins -= 2000000;
        betterIngredients = true;
        UpdateTexts();
    }
}

var farmHands = (localStorage.getItem("farmHands") == null ? 0 : parseInt(localStorage.getItem("farmHands")));
var farmHandCost = Math.floor(1000000 * Math.pow(1.8, farmHands));
var farmHandsText = document.getElementById("farmHands");

function BuyFarmHands()
{
    if(muffins >= farmHandCost)
    {
        muffins -= farmHandCost;
        farmHandCost = Math.floor(farmHandCost * 1.8);
        farmHands++;
        UpdateTexts();
    }
}

var betterTools = (localStorage.getItem("betterTools") == null ? false : localStorage.getItem("betterTools") == "true" ? true : false);
var betterToolsText = document.getElementById("betterTools");

function BuyBetterTools()
{
    if(muffins >= 8000000000 && !betterTools)
    {
        muffins -= 8000000000;
        betterTools = true;
        UpdateTexts();
    }
}

var powerClick = (localStorage.getItem("powerClick") == null ? 0 : parseInt(localStorage.getItem("powerClick")));
var powerClickText = document.getElementById("powerClick");
var powerClickCost = Math.floor(50000000000 * Math.pow(1.8, powerClick));


function BuyPowerClick()
{
    if(muffins >= powerClickCost)
    {
        muffins -= powerClickCost;
        powerClickCost = Math.floor(powerClickCost * 1.8);
        powerClick++;
        UpdateTexts();
    }
}

var muffinMonopoly = (localStorage.getItem("muffinMonopoly") == null ? false : localStorage.getItem("muffinMonopoly") == "true" ? true : false);
var muffinMonopolyText = document.getElementById("muffinMonopoly");

function BuyMuffinMonopoly()
{
    if(muffins >= 10000000000 && !muffinMonopoly)
    {
        muffins -= 10000000000;
        muffinMonopoly = true;
        UpdateTexts();
    }
}

var spaceShip = (localStorage.getItem("spaceShip") == null ? false : localStorage.getItem("spaceShip") == "true" ? true : false);
var spaceShipText = document.getElementById("spaceShip");

function BuySpaceShip()
{
    if(muffins >= 1000000000000 && !spaceShip)
    {
        muffins -= 1000000000000;
        spaceShip = true;
        UpdateTexts();
    }
}

var multiverse = (localStorage.getItem("multiverse") == null ? false : localStorage.getItem("multiverse") == "true" ? true : false);
var multiverseText = document.getElementById("multiverse");

function BuyMultiverse()
{
    if(muffins >= 2000000000000000000 && !multiverse && muffinUniverse > 0)
    {
        muffins -= 2000000000000000000;
        multiverse = true;
        UpdateTexts();
    }
}