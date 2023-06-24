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

//main display
for(let i = 0; i < usedNames.length; i++){
    makeGameDiv(usedNames[i]);
}
//make the game divs that show game name and image
function makeGameDiv(name){
    let gameDiv = document.createElement('div');
    gameDiv.innerHTML += '<center><a href="/'+name+'-"><p>'+name+'</p><img src="images/'+name+'.gif"></a></center>';
    gameDiv.className = 'game';
    document.getElementById('content').appendChild(gameDiv);
}

//sidebar A-Z
const sideBar = document.getElementById('sideBar');
for(let i = 0; i < gameNames.length; i++){
    sideBar.innerHTML += '<center><a href="/'+gameNames[i]+'-"><p>'+gameNames[i]+'</p></a></center>';
}