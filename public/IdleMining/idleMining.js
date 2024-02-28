//Save/load game --------------------------------------------------------------------------------
//TODO: save/load to the server instead of local storage
//do once the game is done
async function Save(){
    let saveData = {
        money: money,
        smallPickaxeCost: smallPickaxeCost,
        smallPickaxes: smallPickaxes,
        largePickaxeCost: largePickaxeCost,
        largePickaxes: largePickaxes,
        newPickaxeCost: newPickaxeCost,
        pickaxeLevel: pickaxeLevel,
        newRockCost: newRockCost,
        rockLevel: rockLevel,
        minecartSpeed: minecartSpeed,
        minecartSpeedCost: minecartSpeedCost,
        minecartSpeedLevel: minecartSpeedLevel,
        rocksInMinecart: rocksInMinecart,
        minecartFullness: minecartFullness,
        minecartCapacity: minecartCapacity,
        minecartCapacityCost: minecartCapacityCost,
        minecartCapacityLevel: minecartCapacityLevel,
        minecartManagerCost: minecartManagerCost,
        hasMinecartManager: hasMinecartManager,
        miningDrillCost: miningDrillCost,
        miningDrillLevel: miningDrillLevel,
        rockDepotCost: rockDepotCost,
        rockDepotLevel: rockDepotLevel
    };
    await postGameData("IdleMining", saveData);
}

async function Load(){
    let saveData = await getGameData("IdleMining");
    if(saveData != null){
        money = saveData.money;
        smallPickaxeCost = saveData.smallPickaxeCost;
        smallPickaxes = saveData.smallPickaxes;
        largePickaxeCost = saveData.largePickaxeCost;
        largePickaxes = saveData.largePickaxes;
        newPickaxeCost = saveData.newPickaxeCost;
        pickaxeLevel = saveData.pickaxeLevel;
        newRockCost = saveData.newRockCost;
        rockLevel = saveData.rockLevel;
        minecartSpeed = saveData.minecartSpeed;
        minecartSpeedCost = saveData.minecartSpeedCost;
        minecartSpeedLevel = saveData.minecartSpeedLevel;
        rocksInMinecart = saveData.rocksInMinecart;
        minecartFullness = saveData.minecartFullness;
        minecartCapacity = saveData.minecartCapacity;
        minecartCapacityCost = saveData.minecartCapacityCost;
        minecartCapacityLevel = saveData.minecartCapacityLevel;
        minecartManagerCost = saveData.minecartManagerCost;
        hasMinecartManager = saveData.hasMinecartManager;
        miningDrillCost = saveData.miningDrillCost;
        miningDrillLevel = saveData.miningDrillLevel;
        rockDepotCost = saveData.rockDepotCost;
        rockDepotLevel = saveData.rockDepotLevel;
    }
    setSprites();
}

function setSprites(){
    idlePickaxeSrc = idlePickaxeSrcs[pickaxeLevel];
    miningPickaxeSrc = miningPickaxeSrcs[pickaxeLevel];
    pickaxe.changeSprite(idlePickaxeSrc);
    smallPickaxe.changeSprite(idlePickaxeSrc);
    largePickaxe.changeSprite(idlePickaxeSrc);
    if(miningDrillLevel > 0)
        miningDrill.changeSprite(miningDrillSrcs[miningDrillLevel-1]);
    rockSrc = rockSrcs[rockLevel];
    rock.changeSprite(rockSrc);
    rockDepot.changeSprite(rockDepotSrcs[rockDepotLevel]);
    minecart.changeSprite(`sprites/minecart1.png`);
}

async function ClearSave(){
    await postGameData("IdleMining", null);
}
//-------------------------------------------------------------------------------------------

//Variables -----------------------------------------------------------------------------------
let money = 0;

//auto mining
let smallPickaxeCost = 100;
let smallPickaxeCostMultiplier = 1.1;
let smallPickaxes = 0;

let largePickaxeCost = 4500;
let largePickaxeCostMultiplier = 1.5;
let largePickaxes = 0;

//upgrade pickaxe
let newPickaxeCost = 6500;
let newPickaxeCostMultiplier = 3;
let pickaxeLevel = 0;

//upgrade rock
let newRockCost = 10000;
let newRockCostMultiplier = 5;
let rockLevel = 0;

//upgrade rock depot
let rockDepotCost = 20000;
let rockDepotCostMultiplier = 5;
let rockDepotLevel = 0;

//mining drill
let miningDrillCost = 100000;
let miningDrillCostMultiplier = 7;
let miningDrillLevel = 0;

//minecart
let minecartState = 0;     // 0 = idle, 1 = going, 2 = returning

let minecartX = 15;
let minecartY = 32;

let minecartSpeed = 20;    
let minecartSpeedCost = 500;
let minecartSpeedCostMultiplier = 5;
let minecartSpeedLevel = 0;

let rocksInMinecart = 0;             
let minecartFullness = 1;  // 1 = empty, 2 = 20%, 3 = 40%, 4 = 60%, 5 = 80%, 6 = full
let minecartCapacity = 20;

let minecartCapacityCost = 500;
let minecartCapacityCostMultiplier = 2.5;
let minecartCapacityLevel = 0;

let minecartManagerCost = 10000;//rn a one time purchase
let hasMinecartManager = false;
// -------------------------------------------------------------------------------------------

// Sprites ------------------------------------------------------------------------------------
const stoneRockSrc = 'IdleMining/sprites/rock_stone.png';
const ironRockSrc = 'IdleMining/sprites/rock_iron.png';
const goldRockSrc = 'IdleMining/sprites/rock_gold.png';
const diamondRockSrc = 'IdleMining/sprites/rock_diamond.png';

const rockSrcs = [stoneRockSrc, ironRockSrc, goldRockSrc, diamondRockSrc];

let rockSrc = stoneRockSrc;

const stonePickaxeIdleSrc = 'IdleMining/sprites/stone_pickaxe_idle.png';
const stonePickaxeMiningSrc = 'IdleMining/sprites/stone_pickaxe_mining.png';
const ironPickaxeIdleSrc = 'IdleMining/sprites/iron_pickaxe_idle.png';
const ironPickaxeMiningSrc = 'IdleMining/sprites/iron_pickaxe_mining.png';
const goldPickaxeIdleSrc = 'IdleMining/sprites/gold_pickaxe_idle.png';
const goldPickaxeMiningSrc = 'IdleMining/sprites/gold_pickaxe_mining.png';
const diamondPickaxeIdleSrc = 'IdleMining/sprites/diamond_pickaxe_idle.png';
const diamondPickaxeMiningSrc = 'IdleMining/sprites/diamond_pickaxe_mining.png';

const idlePickaxeSrcs = [stonePickaxeIdleSrc, ironPickaxeIdleSrc, goldPickaxeIdleSrc, diamondPickaxeIdleSrc];
const miningPickaxeSrcs = [stonePickaxeMiningSrc, ironPickaxeMiningSrc, goldPickaxeMiningSrc, diamondPickaxeMiningSrc];

let idlePickaxeSrc = stonePickaxeIdleSrc;
let miningPickaxeSrc = stonePickaxeMiningSrc;

const miningDrillSrcs = ['IdleMining/sprites/mining_drill1.png', 'IdleMining/sprites/mining_drill2.png'];

const rockDepotSrcs = ['IdleMining/sprites/rock_depot.png', 'IdleMining/sprites/rock_depot2.png', 'IdleMining/sprites/rock_depot3.png', 'IdleMining/sprites/rock_depot4.png'];

const railSrc = 'IdleMining/sprites/rail.png';
const minecartSrc = `IdleMining/sprites/minecart${minecartFullness}.png`;
// -------------------------------------------------------------------------------------------

//GameObjects --------------------------------------------------------------------------------
let rock = new GameObject(30, 60, 40, 40, rockSrc);
let pickaxe = new GameObject(10, 60, 24, 24, idlePickaxeSrc);

let smallPickaxe = new GameObject(70, 60, 5, 5, idlePickaxeSrc);
smallPickaxe.flipX = true;
let largePickaxe = new GameObject(70, 60, 10, 10, idlePickaxeSrc);
largePickaxe.flipX = true;

let miningDrill = new GameObject(28, 48, 15, 15, miningDrillSrcs[miningDrillLevel]);

let rail = new GameObject(0, 0, 10, 10, railSrc);
let minecart = new GameObject(minecartX, minecartY, 10, 10, minecartSrc);

let rockDepot = new GameObject(70, 26, 11, 11, 'IdleMining/sprites/rock_depot.png');
let rockDepotLabel = new TextBox(71.5, 29, 8, 2, 'Rock Depot', 'white', 1.35, 'black');
let rockDepot1 = new GameObject(85, 26, 11, 11, 'IdleMining/sprites/rock_depot.png');
let rockDepotLabel1 = new TextBox(86.5, 29, 8, 2, 'Rock Depot', 'white', 1.35, 'black');

let minecartManager = new GameObject(minecartX - 5, minecartY - 5, 10, 10, 'IdleMining/sprites/minecart_manager.png');
// -------------------------------------------------------------------------------------------

//UI ------------------------------------------------------------------------------------------
let textBoxBackground = '#303030';
let textBoxTextColor = 'white';
let storeBackgroundColor = '#404040';

const minecartFullIndicator = new TextBox(minecartX - 1, minecartY - 5, 12, 3, 'Minecart Full', textBoxTextColor, 2, textBoxBackground);

//store UI
const storeBackground = new TextBox(0, 0, 100, 25, '', 'white', 1, storeBackgroundColor);

const moneyTextBox = new TextBox(2, 2, 96, 6, 'Money: ' + money, textBoxTextColor, 4, textBoxBackground);
let storeX = 2;
let storeY = 10;
let storeW = 30;
let storeH = 3;
let storeFontSize = 1.8;

const buySmallPickaxeTextBox = new TextBox(storeX, storeY, storeW, storeH, 'Buy Small Pickaxe: ', textBoxTextColor, storeFontSize, textBoxBackground);
const buyLargePickaxeTextBox = new TextBox(storeX, storeY*1.5, storeW, storeH, 'Buy Large Pickaxe: ', textBoxTextColor, storeFontSize, textBoxBackground);

const buyMiningDrillTextBox = new TextBox(storeX, storeY*2, storeW, storeH, 'Buy Mining Drill: ', textBoxTextColor, storeFontSize, textBoxBackground);

const upgradePickaxeTextBox = new TextBox(storeX*17, storeY, storeW, storeH, 'Upgrade Pickaxe: ', textBoxTextColor, storeFontSize, textBoxBackground);
const upgradeRockTextBox = new TextBox(storeX*17, storeY*1.5, storeW, storeH, 'Upgrade Rock: ', textBoxTextColor, storeFontSize, textBoxBackground);
const upgradeRockDepotTextBox = new TextBox(storeX*17, storeY*2, storeW, storeH, 'Upgrade Rock Depot: ', textBoxTextColor, storeFontSize, textBoxBackground);

const upgradeMinecartSpeedTextBox = new TextBox(storeX*34, storeY*2, storeW, storeH, 'Upgrade Cart Speed: ', textBoxTextColor, storeFontSize, textBoxBackground);
const upgradeMinecartCapacityTextBox = new TextBox(storeX*34, storeY*1.5, storeW, storeH, 'Upgrade Cart Capacity: ', textBoxTextColor, storeFontSize, textBoxBackground);
const buyMinecartManagerTextBox = new TextBox(storeX*34, storeY, storeW, storeH, 'Buy Minecart Manager: ', textBoxTextColor, storeFontSize, textBoxBackground);

const UIElements = [storeBackground, moneyTextBox, buySmallPickaxeTextBox,
                     buyLargePickaxeTextBox, upgradePickaxeTextBox, upgradeRockTextBox,
                     upgradeMinecartSpeedTextBox, upgradeMinecartCapacityTextBox,
                     buyMinecartManagerTextBox, buyMiningDrillTextBox, upgradeRockDepotTextBox];//Add all UI elements to this array and they will be drawn 
// -------------------------------------------------------------------------------------------  

function mine(){
    if(minecartState != 0 || minecartFullness == 6){ //can only mine if minecart is idle
        return;
    }
    pickaxe.changeSprite(miningPickaxeSrc);
    setTimeout(function(){pickaxe.changeSprite(idlePickaxeSrc);}, 100);
    let stones = (pickaxeLevel*5) + 1;
    putStonesInMinecart(stones);
    //money += (pickaxeLevel*10) + (rockLevel*20) + 1;
}

function buySmallPickaxe(){
    if(money >= smallPickaxeCost){
        money -= smallPickaxeCost;
        smallPickaxeCost *= smallPickaxeCostMultiplier;
        smallPickaxeCost = Math.round(smallPickaxeCost); 
        smallPickaxes++;
    }
}

function buyLargePickaxe(){
    if(money >= largePickaxeCost){
        money -= largePickaxeCost;
        largePickaxeCost *= largePickaxeCostMultiplier;
        largePickaxeCost = Math.round(largePickaxeCost); 
        largePickaxes++;
    }
}

function upgradePickaxe(){
    if(money >= newPickaxeCost && pickaxeLevel < 3){
        money -= newPickaxeCost;
        newPickaxeCost *= newPickaxeCostMultiplier;
        newPickaxeCost = Math.round(newPickaxeCost);
        pickaxeLevel++;
        idlePickaxeSrc = idlePickaxeSrcs[pickaxeLevel];
        miningPickaxeSrc = miningPickaxeSrcs[pickaxeLevel];
        pickaxe.changeSprite(idlePickaxeSrc);
        smallPickaxe.changeSprite(idlePickaxeSrc);
        largePickaxe.changeSprite(idlePickaxeSrc);
    }
}

function upgradeRock(){
    if(money >= newRockCost && rockLevel < 3){
        money -= newRockCost;
        newRockCost *= newRockCostMultiplier;
        newRockCost = Math.round(newRockCost);
        rockLevel++;
        rockSrc = rockSrcs[rockLevel];
        rock.changeSprite(rockSrc);
    }
}

function upgradeRockDepot(){
    if(money >= rockDepotCost && rockDepotLevel < 3){
        money -= rockDepotCost;
        rockDepotCost *= rockDepotCostMultiplier;
        rockDepotCost = Math.round(rockDepotCost);
        rockDepotLevel++;
        rockDepot.changeSprite(rockDepotSrcs[rockDepotLevel]);
        rockDepot1.changeSprite(rockDepotSrcs[rockDepotLevel]);
    }

}

function upgradeMinecartSpeed(){
    if(money >= minecartSpeedCost){
        money -= minecartSpeedCost;
        minecartSpeedCost *= minecartSpeedCostMultiplier;
        minecartSpeedCost = Math.round(minecartSpeedCost);
        minecartSpeedLevel++;
        minecartSpeed = minecartSpeedLevel*10 + 20;
    }
}

function upgradeMinecartCapacity(){
    if(money >= minecartCapacityCost){
        money -= minecartCapacityCost;
        minecartCapacityCost *= minecartCapacityCostMultiplier;
        minecartCapacityCost = Math.round(minecartCapacityCost);
        minecartCapacityLevel++;
        minecartCapacity = 20 + minecartCapacityLevel*40;
    }
}

function buyMinecartManager(){
    if(money >= minecartManagerCost && !hasMinecartManager){
        money -= minecartManagerCost;
        hasMinecartManager = true;
    }
}

function buyMiningDrill(){
    if(money >= miningDrillCost && miningDrillLevel < 2){
        money -= miningDrillCost;
        miningDrillCost *= miningDrillCostMultiplier;
        miningDrillCost = Math.round(miningDrillCost);
        miningDrillLevel++;
        miningDrill.changeSprite(`sprites/mining_drill${miningDrillLevel}.png`);
    }
}

function putStonesInMinecart(stones){
    //only put stones in minecart if it is idle
    if(minecartState != 0){
        return;
    }

    rocksInMinecart += stones;
    if(rocksInMinecart >= minecartCapacity){
        rocksInMinecart = minecartCapacity;
        minecartFullness = 6;
    }
    else{
        minecartFullness = Math.floor(rocksInMinecart / minecartCapacity * 5) + 1;
    }
    minecart.changeSprite(`IdleMining/sprites/minecart${minecartFullness}.png`);
}

function getMoneyForRocks(rocks){
    money += rocks * (rockLevel + 1) * (5*rockDepotLevel + 1) * 10;
}

function sendMinecart(){
    if(minecartState == 0){
        minecartState = 1;
    }
}
        
function handleClick(e){
    let [x,y] = getMousePos(e);
    if(buySmallPickaxeTextBox.isClicked(e)){
        buySmallPickaxe();
    }
    if(buyLargePickaxeTextBox.isClicked(e)){
        buyLargePickaxe();
    }
    if(pickaxe.isClicked(e)){
        mine();
    }
    if(upgradePickaxeTextBox.isClicked(e)){
        upgradePickaxe();
    }
    if(upgradeRockTextBox.isClicked(e)){
        upgradeRock();
    }
    if(minecart.isClicked(e)){
        //console.log('minecart clicked');
        sendMinecart();
    }
    if(upgradeMinecartSpeedTextBox.isClicked(e)){
        upgradeMinecartSpeed();
    }
    if(upgradeMinecartCapacityTextBox.isClicked(e)){
        upgradeMinecartCapacity();
    }
    if(buyMinecartManagerTextBox.isClicked(e)){
        buyMinecartManager();
    }
    if(buyMiningDrillTextBox.isClicked(e)){
        buyMiningDrill();
    }
    if(upgradeRockDepotTextBox.isClicked(e)){
        upgradeRockDepot();
    }
}

function draw(){
    fillCanvas('#202020'); //background

    //rock
    rock.draw();
    //pickaxe
    pickaxe.draw();

    //small pickaxes
    let cx = rock.x + rock.w/2;
    let cy = rock.y + rock.h/2;
    let rad = rock.w/2 + 2;
    let numPickaxes = smallPickaxes;
    for(let i = 0; i < numPickaxes; i++){
        smallPickaxe.moveTo(cx + Math.cos(i/numPickaxes * Math.PI/1.5 - Math.PI/2) * rad, cy + Math.sin(i/numPickaxes * Math.PI/1.5 - Math.PI/2) * rad);
        smallPickaxe.draw();
    }

    //large pickaxes
    cx = rock.x + rock.w/2;
    cy = rock.y + rock.h/2 - 5;
    rad = rock.w/2 + 10;
    numPickaxes = largePickaxes;
    for(let i = 0; i < numPickaxes; i++){
        largePickaxe.moveTo(cx + Math.cos(i/numPickaxes * Math.PI/1.5 - Math.PI/2) * rad, cy + Math.sin(i/numPickaxes * Math.PI/1.5 - Math.PI/2) * rad);
        largePickaxe.draw();
    }

    //mining drill
    if(miningDrillLevel > 0){
        miningDrill.draw();
    }

    //rail
    let railX = 0;
    let railY = 35;
    for(let i = 0; i < 10; i++){
        rail.moveTo(railX, railY);
        rail.draw();
        railX += rail.w;
    } 

    //rock depot
    rockDepot.draw();
    rockDepotLabel.draw();
    rockDepot1.draw();
    rockDepotLabel1.draw();

    //minecart manager
    if(hasMinecartManager){
        minecartManager.draw();
    }

    //minecart
    minecart.draw();

    
    //minecart full indicator
    if(minecartFullness == 6 && minecartState == 0){
        minecartFullIndicator.draw();
    }

    //UI
    for(let i = 0; i < UIElements.length; i++){
        UIElements[i].draw();
    }
}

function awake(){
    const reset = false;
    if(!reset)
        Load();
    else
        ClearSave();
    setInterval(Save, 5000); //save every 5 seconds
}

let pickaxeTimer = 0;
function logic(deltaTime){ //deltaTime is the time in seconds since the last frame
    //money += ((smallPickaxes + largePickaxes*20) * (pickaxeLevel + 1) * (rockLevel + 1)) * deltaTime;

    //update minecart
    if(minecartState == 0){
        putStonesInMinecart(((smallPickaxes + largePickaxes*20) * (pickaxeLevel + 1) + (miningDrillLevel*500)) * deltaTime);
    }

    //minecart manager
    if(hasMinecartManager){
        if(minecartState == 0 && minecartFullness == 6){
            sendMinecart();
        }
    }

    if(minecartState == 1){
        //console.log('minecart going');
        minecartX += minecartSpeed * deltaTime;
        minecart.moveTo(minecartX, minecartY);
        if(minecartX >= 73){
            minecartState = 2;
            getMoneyForRocks(rocksInMinecart);
            rocksInMinecart = 0;
            minecartFullness = 1;
            minecart.changeSprite(`IdleMining/sprites/minecart${minecartFullness}.png`);
        }
    }
    if(minecartState == 2){
        //console.log('minecart returning');
        minecartX -= minecartSpeed * deltaTime;
        minecart.moveTo(minecartX, minecartY);
        if(minecartX <= 15){
            minecartState = 0;
        }
    }

    //update small and large pickaxes
    if(minecartState == 0 && minecartFullness != 6){ //only update pickaxes if minecart is idle and not full
        pickaxeTimer += deltaTime;
        if(pickaxeTimer >= 1){
            pickaxeTimer = 0;

            smallPickaxe.changeSprite(miningPickaxeSrc);
            largePickaxe.changeSprite(miningPickaxeSrc);
            setTimeout(function(){
                                    smallPickaxe.changeSprite(idlePickaxeSrc); 
                                    largePickaxe.changeSprite(idlePickaxeSrc);
                                }, 100);
        }
    }

    UpdateUI();
}

function UpdateUI(){
    //update UI
    moneyTextBox.text = 'Money: ' + truncate(money, 2);
    buySmallPickaxeTextBox.text = 'Buy Small Pickaxe: ' + smallPickaxeCost;
    buyLargePickaxeTextBox.text = 'Buy Large Pickaxe: ' + largePickaxeCost;
 
    if(miningDrillLevel === 2){
        buyMiningDrillTextBox.text = 'Mining Drill: N/A';
    }
    else{
        buyMiningDrillTextBox.text = 'Buy Mining Drill: ' + miningDrillCost;
    }
 
    if(pickaxeLevel === 3){
        upgradePickaxeTextBox.text = 'Upgrade Pickaxe: N/A';
    }
    else{
        upgradePickaxeTextBox.text = 'Upgrade Pickaxe: ' + newPickaxeCost;
    }
 
    if(rockLevel === 3){
        upgradeRockTextBox.text = 'Upgrade Rock: N/A';
    }
    else{
        upgradeRockTextBox.text = 'Upgrade Rock: ' + newRockCost;
    }
 
    upgradeMinecartSpeedTextBox.text = 'Upgrade Cart Speed: ' + minecartSpeedCost;
    upgradeMinecartCapacityTextBox.text = 'Upgrade Cart Capacity: ' + minecartCapacityCost;
     
    if(hasMinecartManager){
        buyMinecartManagerTextBox.text = 'Buy Minecart Manager: N/A';
    }
    else{
        buyMinecartManagerTextBox.text = 'Buy Minecart Manager: ' + minecartManagerCost;
    }

    if(rockDepotLevel === 3){
        upgradeRockDepotTextBox.text = 'Upgrade Rock Depot: N/A';
    }
    else{
        upgradeRockDepotTextBox.text = 'Upgrade Rock Depot: ' + rockDepotCost;
    }
}


const c = document.getElementById('canvas');
c.addEventListener('click', handleClick);
initCGFW(awake, logic, c, draw, 100, 100, true); //When the game is going to be published change this to false to make it not automatically fullscreen

setFont('Papyrus', '10', 'white');