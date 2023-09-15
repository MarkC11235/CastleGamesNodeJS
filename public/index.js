//All games A-Z
const gameNames = ['2048', 'Bird', 'BlackJack', 'BlockStack', 'CubeDash', 'HangMan', 'Minesweeper',
                 'Memory', 'MeteorShower', 'MiniGolf', 'MuffinMaker', 'OpenBattle', 'OppositesAttract',
                  'Pong', 'Rocket', 'Serpent', 'SpaceBattle', 'SuperJumpMan', 'TargetPractice', 'TowerBuilder',
                   'ZombieSurvival'];

//These games are displayed at the top of the page
const popNames = ['SpaceBattle', 'ZombieSurvival', 'SuperJumpMan', 'CubeDash', 'BlockStack', 'Serpent', 'MiniGolf'];

//These games shown on mobile devices
const mobileFriendlyNames = ['Bird', 'BlackJack', 'MiniGolf', 'MuffinMaker', 'OppositesAttract'];

//makes sure that the popular/new games are displayed first
let usedNames = gameNames.filter(name => !popNames.includes(name));
usedNames.unshift('SpaceBattle', 'ZombieSurvival', 'SuperJumpMan', 'CubeDash', 'BlockStack', 'Serpent', 'MiniGolf');


if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    usedNames = mobileFriendlyNames;
}

const CONTENT = document.getElementById('content');
const GAMES = document.getElementById('games');
const SIDEBAR = document.getElementById('sideBar');

const r = document.querySelector(':root');

const gameDivList = [];

let curGamesPerRow = 4;
function loadHomePage(){
    var w = window.innerWidth;
    var h = window.innerHeight;
    //console.log(w, h);
    console.log(r.style.getPropertyValue('--games-per-row'));

    //adjust num games per row
    if(w < 1000){
        curGamesPerRow = 1;
    }else if(w < 1450){
        curGamesPerRow = 2;
    }else if(w < 1900){
        curGamesPerRow = 3;
    }else{
        curGamesPerRow = 4;
    }

    if(r.style.getPropertyValue('--games-per-row') == curGamesPerRow) return;

    r.style.setProperty('--games-per-row', curGamesPerRow);
    //r.style.setProperty('--games-em-width', 26 + 4 * (4 - curGamesPerRow));
    console.log(r.style.getPropertyValue('--games-per-row'));
    console.log(r.style.getPropertyValue('--games-em-width'));

    GAMES.innerHTML = '';
    for(let i = 0; i < gameDivList.length; i++){
        GAMES.appendChild(gameDivList[i]);
    }

    //sidebar A-Z
    SIDEBAR.innerHTML = '';
    SIDEBAR.innerHTML += '<center><p style="font-weight: bold;font-size: 25px;"> Games A-Z </p></center>';
    for(let i = 0; i < gameNames.length; i++){
        SIDEBAR.innerHTML += '<center><a href="/'+gameNames[i]+'-"><p>'+gameNames[i]+'</p></a></center>';
    }
}

//main display
for(let i = 0; i < usedNames.length; i++){
    makeGameDiv(usedNames[i]);
}
//make the game divs that show game name and image
//GAMES.innerHTML = '';
function makeGameDiv(name){
    let gameDiv = document.createElement('div');
    gameDiv.innerHTML += '<center><a href="/'+name+'-"><p>'+name+'</p><img src="images/'+name+'.gif"></a></center>';
    gameDiv.className = 'game';
    gameDivList.push(gameDiv);
}

loadHomePage();
window.addEventListener("resize", loadHomePage);