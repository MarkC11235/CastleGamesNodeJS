//set theme to the one stored in the cookie
var theme = getCookie("theme") == "" ? "blue" : getCookie("theme");
console.log("Theme set to " + theme);

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
            r.style.setProperty('--background-main', '#531CB3');
            r.style.setProperty('--background-secondary', '#944BBB');
            r.style.setProperty('--border-color', '#AA7BC3');
            r.style.setProperty('--text-color', 'rgb(0, 0, 0)');
            break;
        case "green":
            r.style.setProperty('--background-main', '#689689');
            r.style.setProperty('--background-secondary', '#83E8BA');
            r.style.setProperty('--border-color', '#504136');
            r.style.setProperty('--text-color', 'rgb(0, 0, 0)');
            break;
        default:
            setTheme("blue");
            break;
    }
    document.cookie = "theme=" + theme;
    console.log("Theme set to " + theme);
}

setTheme();
