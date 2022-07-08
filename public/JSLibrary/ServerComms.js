async function postGameData(route, data)
{
    await fetch("/"+route+"Data", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: data
        })
    });
}

async function getGameData(route)
{
    var temp;
    await fetch("/"+route+"Data", {method: "GET"}).then(response => response.json()).then(data => {
        if(data.length > 0)
        {
            temp = data[0].data;
        }
        else
        {
            temp = null;
        }
    });
    return temp;
}