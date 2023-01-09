const gameNames = ['2048', 'Bird', 'BlackJack', 'BlockStack', 'CubeDash', 'HangMan', 'Minesweeper',
                 'Memory', 'MeteorShower', 'MiniGolf', 'MuffinMaker', 'OpenBattle', 'OppositesAttract',
                  'Pong', 'Rocket', 'Serpent', 'SuperJumpMan', 'TargetPractice', 'TowerBuilder',
                   'ZombieSurvival'];

const popNames = ['ZombieSurvival', 'SuperJumpMan', 'CubeDash', 'BlockStack', 'Serpent', 'MiniGolf'];

const mobileFriendlyNames = ['Bird', 'BlackJack', 'MiniGolf', 'MuffinMaker', 'OppositesAttract'];

const usedNames = gameNames.filter(name => !popNames.includes(name));
usedNames.unshift('ZombieSurvival', 'SuperJumpMan', 'CubeDash', 'BlockStack', 'Serpent', 'MiniGolf');


if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    usedNames = mobileFriendlyNames;
}

//main display
for(let i = 0; i < usedNames.length; i++){
    makeGameDiv(usedNames[i]);
}
function makeGameDiv(name){
    let gameDiv = document.createElement('div');
    gameDiv.innerHTML += '<center><p style = "font-size : 30px";>'+name+'</p></center><center><a href="/'+name+'-"><img src="images/'+name+'.gif"></a><center>';
    gameDiv.className = 'game';
    document.getElementById('content').appendChild(gameDiv);
}

//sidebar A-Z
const sideBar = document.getElementById('sideBar');
for(let i = 0; i < gameNames.length; i++){
    sideBar.innerHTML += '<center><a href="/'+gameNames[i]+'-"><p>'+gameNames[i]+'</p></a></center>';
}