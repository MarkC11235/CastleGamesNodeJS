const userData = [];
const display = document.getElementsByClassName('display')[0];

async function LoadData(){
    const data = await getAllGameData();
    console.log(data);

    for (const key in data) {
        if(data[key] instanceof Object){
            display.innerHTML += `<p style = "font-size: 1.5em; ">${key.substring(0, key.length - 4)}:</p>`;
            for(const subKey in data[key]){
                display.innerHTML += `<p style = "font-size: .7em">${subKey}: ${data[key][subKey]}</p>`;
            }
        }
        else{
            display.innerHTML += `<p style = "font-size: 1.7em">${key}:</p>`;
            display.innerHTML += `<p style = "font-size: 1em">${data[key]}</p>`;
        }
    }
}

LoadData();
