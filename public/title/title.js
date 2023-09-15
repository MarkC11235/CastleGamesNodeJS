const mediaQuery = window.matchMedia('(max-width: 1000px)');
const titleP = document.getElementById('title');

//console.log('screen width: ' + window.innerWidth);
//console.log('screen height: ' + window.innerHeight);
//console.log('media query: ' + mediaQuery.matches);

function handleScreenChange() {
  //console.log('small screen : ' + mediaQuery.matches);
  if (!mediaQuery.matches) {
    titleP.innerHTML = "<img src = \"images/C.png\">\
                            <img src = \"images/A.png\">\
                            <img src = \"images/S.png\">\
                            <img src = \"images/T.png\">\
                            <img src = \"images/L.png\">\
                            <img src = \"images/E.png\">\
                            <img id = \"emptyImg\"> \
                            <img src = \"images/G.png\">\
                            <img src = \"images/A.png\">\
                            <img src = \"images/M.png\">\
                            <img src = \"images/E.png\">\
                            <img src = \"images/S.png\">";
  } else {
    titleP.innerHTML = "<img src = \"images/C.png\">\
                            <img src = \"images/A.png\">\
                            <img src = \"images/S.png\">\
                            <img src = \"images/T.png\">\
                            <img src = \"images/L.png\">\
                            <img src = \"images/E.png\">\
                            <br>\
                            <img src = \"images/G.png\">\
                            <img src = \"images/A.png\">\
                            <img src = \"images/M.png\">\
                            <img src = \"images/E.png\">\
                            <img src = \"images/S.png\">";
  }
}

window.addEventListener("resize", handleScreenChange);