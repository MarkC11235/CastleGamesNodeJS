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
        if(data)
        {
            temp = data;
        }
        else
        {
            temp = null;
        }
    });
    return temp;
}


async function postUserInfo(data)
{
    await fetch("/userInfo", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            theme : data.theme,
            profilePicture : data.profilePicture
        })
    });
}

async function getUserInfo()
{
    var temp;
    await fetch("/userInfo", {method: "GET"}).then(response => response.json()).then(data => {
        if(data)
        {
            temp = data;
        }
        else
        {
            temp = null;
        }
    });
    return temp;
}