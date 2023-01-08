const userData = [];
const display = document.getElementsByClassName('display')[0];

//each route to get data from the server
const games = ["ChipCount", "BlockStack", "Memory", 
"MeteorShower", "Serpent", "TargetPractice",
"TowerBuilder"];

async function LoadData(){
    for(let i = 0; i < games.length; i++)
    {
        userData.push();
        var data = await getGameData(games[i]);
        if(data != null){
            userData[i] = data;
        }
        else{
            continue;
        }

        if(data.indexOf("-") == -1){
            display.innerHTML += "<p>" + games[i] + ": " + data + "</p>";
        }
        else{
            display.innerHTML += "<p>" + games[i] + ": " + data.split("-")[0] + "</p>";
        }
    }
}

LoadData();
