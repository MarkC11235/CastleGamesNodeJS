//muffin production
var bakers = (localStorage.getItem("bakers") == null ? 0 : parseInt(localStorage.getItem("bakers")));
var bakerCost = Math.floor(10 * Math.pow(1.4, bakers));
var bakerText = document.getElementById("bakers");

function BuyBakers()
{
    if(muffins >= bakerCost)
    {
        muffins -= bakerCost;
        bakerCost = Math.floor(bakerCost * 1.4);
        bakers++;
        UpdateTexts();
    }
}

var gourmetChefs = (localStorage.getItem("gourmetChef") == null ? 0 : parseInt(localStorage.getItem("gourmetChef")));
var gourmetChefCost = Math.floor(200 * Math.pow(1.4, gourmetChefs));
var gourmetChefText = document.getElementById("gourmetChef");

function BuyGourmetChefs()
{
    if(muffins >= gourmetChefCost)
    {
        muffins -= gourmetChefCost;
        gourmetChefCost = Math.floor(gourmetChefCost * 1.4);
        gourmetChefs++;
        UpdateTexts();
    }
}

var muffinShops = (localStorage.getItem("muffinShops") == null ? 0 : parseInt(localStorage.getItem("muffinShops")));
var muffinShopCost = Math.floor(1000 * Math.pow(1.4, muffinShops));
var muffinShopText = document.getElementById("muffinShop");

function BuyMuffinShop()
{
    if(muffins >= muffinShopCost)
    {
        muffins -= muffinShopCost;
        muffinShopCost = Math.floor(muffinShopCost * 1.4);
        muffinShops++;
        UpdateTexts();
    }
}

var muffinFactory = (localStorage.getItem("muffinFactory") == null ? 0 : parseInt(localStorage.getItem("muffinFactory")));
var muffinFactoryCost = Math.floor(100000 * Math.pow(1.4, muffinFactory));
var muffinFactoryText = document.getElementById("muffinFactory");

function BuyMuffinFactory()
{
    if(muffins >= muffinFactoryCost)
    {
        muffins -= muffinFactoryCost;
        muffinFactoryCost = Math.floor(muffinFactoryCost * 1.4);
        muffinFactory++;
        UpdateTexts();
    }
}

var muffinFarm = (localStorage.getItem("muffinFarm") == null ? 0 : parseInt(localStorage.getItem("muffinFarm")));
var muffinFarmCost = Math.floor(2000000 * Math.pow(1.4, muffinFarm));
var muffinFarmText = document.getElementById("muffinFarm");

function BuyMuffinFarm()
{
    if(muffins >= muffinFarmCost)
    {
        muffins -= muffinFarmCost;
        muffinFarmCost = Math.floor(muffinFarmCost * 1.4);
        muffinFarm++;
        UpdateTexts();
    }
}

var muffinCity = (localStorage.getItem("muffinCity") == null ? 0 : parseInt(localStorage.getItem("muffinCity")));
var muffinCityCost = Math.floor(100000000 * Math.pow(1.4, muffinCity));
var muffinCityText = document.getElementById("muffinCity");

function BuyMuffinCity()
{
    if(muffins >= muffinCityCost)
    {
        muffins -= muffinCityCost;
        muffinCity++;
        muffinCityCost = Math.floor(muffinCityCost * 1.4);
        UpdateTexts();
    }
}

var muffinMine = (localStorage.getItem("muffinMine") == null ? 0 : parseInt(localStorage.getItem("muffinMine")));
var muffinMineCost = Math.floor(2000000000 * Math.pow(1.4, muffinMine));
var muffinMineText = document.getElementById("muffinMine");

function BuyMuffinMine()
{
    if(muffins >= muffinMineCost)
    {
        muffins -= muffinMineCost;
        muffinMine++;
        muffinMineCost = Math.floor(muffinMineCost * 1.4);
        UpdateTexts();
    }
}

var muffinEmpire = (localStorage.getItem("muffinEmpire") == null ? 0 : parseInt(localStorage.getItem("muffinEmpire")));
var muffinEmpireCost = Math.floor(150000000000 * Math.pow(1.4, muffinEmpire));
var muffinEmpireText = document.getElementById("muffinEmpire");

function BuyMuffinEmpire()
{
    if(muffins >= muffinEmpireCost)
    {
        muffins -= muffinEmpireCost;
        muffinEmpireCost = Math.floor(muffinEmpireCost * 1.4);
        muffinEmpire++;
        UpdateTexts();
    }
}

var muffinPlanet = (localStorage.getItem("muffinPlanet") == null ? 0 : parseInt(localStorage.getItem("muffinPlanet")));
var muffinPlanetCost = Math.floor(5000000000000 * Math.pow(1.4, muffinPlanet));
var muffinPlanetText = document.getElementById("muffinPlanet");

function BuyMuffinPlanet()
{
    if(muffins >= muffinPlanetCost && spaceShip == true)
    {
        muffins -= muffinPlanetCost;
        muffinPlanetCost = Math.floor(muffinPlanetCost * 1.4);
        muffinPlanet++;
        UpdateTexts();
    }
}

var muffinSolarSystem = (localStorage.getItem("muffinSolarSystem") == null ? 0 : parseInt(localStorage.getItem("muffinSolarSystem")));
var muffinSolarSystemCost = Math.floor(1000000000000000 * Math.pow(1.4, muffinSolarSystem));
var muffinSolarSystemText = document.getElementById("muffinSolarSystem");

function BuyMuffinSolarSystem()
{
    if(muffins >= muffinSolarSystemCost && spaceShip == true)
    {
        muffins -= muffinSolarSystemCost;
        muffinSolarSystemCost = Math.floor(muffinSolarSystemCost * 1.4);
        muffinSolarSystem++;
        UpdateTexts();
    }
}

var muffinGalaxy = (localStorage.getItem("muffinGalaxy") == null ? 0 : parseInt(localStorage.getItem("muffinGalaxy")));
var muffinGalaxyCost = Math.floor(1000000000000000000 * Math.pow(1.4, muffinGalaxy));
var muffinGalaxyText = document.getElementById("muffinGalaxy");

function BuyMuffinGalaxy()
{
    if(muffins >= muffinGalaxyCost && spaceShip == true)
    {
        muffins -= muffinGalaxyCost;
        muffinGalaxyCost = Math.floor(muffinGalaxyCost * 1.4);
        muffinGalaxy++;
        UpdateTexts();
    }
}

var muffinUniverse = (localStorage.getItem("muffinUniverse") == null ? 0 : parseInt(localStorage.getItem("muffinUniverse")));
var muffinUniverseCost = Math.floor(1000000000000000000000 * Math.pow(1.4, muffinUniverse));
var muffinUniverseText = document.getElementById("muffinUniverse");

function BuyMuffinUniverse()
{
    if(muffins >= muffinUniverseCost && spaceShip == true && (muffinUniverse == 0 || multiverse == true))
    {
        muffins -= muffinUniverseCost;
        muffinUniverse++;
        muffinUniverseCost = Math.floor(muffinUniverseCost * 1.4);
        UpdateTexts();
    }
}


