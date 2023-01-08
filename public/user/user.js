//set theme to the one stored in the cookie
var theme = getCookie("theme") == "" ? "blue" : getCookie("theme");

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

var r = document.querySelector(':root');
var rs = getComputedStyle(r);

function themeButton(t){
    theme = t;
    setTheme();
}

function setTheme(){
    switch(theme){
        case "blue":
            r.style.setProperty('--background-main', 'lightseagreen');
            r.style.setProperty('--background-secondary', 'rgb(21, 21, 201)');
            r.style.setProperty('--border-color', 'rgb(0, 1, 71)');
            r.style.setProperty('--text-color', 'rgb(0, 0, 0)');
            break;
        case "brown":
            r.style.setProperty('--background-main', '#6F1D1B');
            r.style.setProperty('--background-secondary', '#99582A');
            r.style.setProperty('--border-color', '#432818');
            r.style.setProperty('--text-color', 'rgb(0, 0, 0)');
            break;
        case "purple":
            r.style.setProperty('--background-main', '#7C238C');
            r.style.setProperty('--background-secondary', '#680E4B');
            r.style.setProperty('--border-color', '#42033D');
            r.style.setProperty('--text-color', 'rgb(255, 255, 255)');
            break;
        case "green":
            r.style.setProperty('--background-main', '#048A4B');
            r.style.setProperty('--background-secondary', '#283618');
            r.style.setProperty('--border-color', '#504136');
            r.style.setProperty('--text-color', 'rgb(0, 0, 0)');
            break;
        case "dark":
            r.style.setProperty('--background-main', '#1E1E1E');
            r.style.setProperty('--background-secondary', '#2E2E2E');
            r.style.setProperty('--border-color', '#3E3E3E');
            r.style.setProperty('--text-color', 'rgb(255, 255, 255)');
            break;
        default:
            setTheme("blue");
            break;
    }
    //document.cookie = "theme=" + theme;
    var date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = "theme=" + theme + "; expires="+date.toUTCString()+"; path=/";
    console.log("Theme set to " + theme);
}

setTheme();


//set profile picture to the one stored in the cookie
var profilePicture = getCookie("profilePicture") == "" ? "default" : getCookie("profilePicture");

function profilePictureButton(p){
    profilePicture = p;
    setProfilePicture();
}

function setProfilePicture(){
    switch(profilePicture){
        case "default":
            document.getElementById("profilePicture").style.backgroundImage = "url(images/defaultProfilePicture.png)";
            break;
        case "castle":
            document.getElementById("profilePicture").style.backgroundImage = "url(images/WebsiteIcon.png)";
            break;
        case "blueCastle":
            document.getElementById("profilePicture").style.backgroundImage = "url(images/blueCastle.png)";
            break;
        case "muffin":
            document.getElementById("profilePicture").style.backgroundImage = "url(images/MuffinMaker.gif)";
            break;
        default:
            setProfilePicture("default");
            break;
    }
    var date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = "profilePicture=" + profilePicture + "; expires="+date.toUTCString()+"; path=/";
    console.log("Profile picture set to " + profilePicture);
}

window.addEventListener('load', function() {
    setProfilePicture();
})