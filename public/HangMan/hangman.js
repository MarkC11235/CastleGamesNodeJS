//Generate a list of words or short phrases more than 4 letters long
var wordList = ["apple","fruit","yogurt","school","colors","rain cloud","phone","umbrella","rain forest","textbook",
"ice cream","sky scraper","warrior","balloon","chocolate","solar panels","jungle","pyramid","square","length","jogging",
"internet","basketball","football","baseball","tennis","brain","stomach","computer","chair","table","toothbrush","picture",
"bottle","halfway","road trip","window","fire alarm","blades","display","elephant","crocodile","shark","tiger","lion",
"monkey","giraffe","penguin","elephant","panda","pig","cow","dog","cat","mouse","snake","lizard","turtle","frog","spider",
"ant","bee","butterfly","camel","crocodile","dolphin","eagle","fish","giraffe","hippo","horse","kangaroo","lion","monkey",
"octopus","owl","penguin","pig","rabbit","rhino","snake","squirrel","tiger","whale","zebra","zoo","bicycle","car","motorcycle",
"train","airplane","boat","bus","car","helicopter","ship","airplane","balloon","bicycle","bus","car","helicopter","ship","the bright sun",
"the dark side","the sky","the ocean","the sun","the moon","the stars","the sun","the moon","the stars","the sun","the moon","the stars",
"shopping","playing","eating","sleeping","watching","football","basketball","tennis","swimming","running","reading","cooking","writing",
"orange", "purple", "the night sky", "galaxy", "universe",];


var playing = true;

const wordText = document.getElementById("word");
var wordSoFar = [];
var word = "";
var letters = 0;

var guessesLeft = 6;
const guessesLeftText = document.getElementById("guessesLeft");

const img = document.getElementById("img");
var imgNum = 0;

const notGuessedLettersText = document.getElementById("notGuessedLetters");
var notGuessedLetters = [];


function Start()
{
    playing = true;

    wordSoFar = [];
    letters = 0;

    guessesLeft = 6;
    guessesLeftText.innerHTML = "Guesses Left : "+guessesLeft;


    imgNum = 0;
    img.src = "images/sprite_"+imgNum+".png";

    for(var i = 0; i < 26; i++)
    {
        notGuessedLetters[i] = " " +String.fromCharCode(97 + i)+" ";
    }
    //alert(notGuessedLetters);

    DisplayLettersNotGuessed();

    word = wordList[parseInt(Math.random() * wordList.length)];

    for(var i = 0; i < word.length; i++)
    {
        if(word.substring(i,i+1) != " ")
        {
            wordSoFar[i] = " __ ";
            letters += 1;
        }
        else
            wordSoFar[i] =  " - ";
    }

    DisplayWord();
}

function DisplayLettersNotGuessed()
{
    var temp = "Letters Not Guessed - - - [";
    for(var i = 0; i < notGuessedLetters.length; i++)
    {
        if(i != notGuessedLetters.length - 1)
        {
            temp += notGuessedLetters[i] + ",";
        }
        else
        {
            temp += notGuessedLetters[i];
        }
    }
    temp += "]";

    notGuessedLettersText.innerHTML = temp;
    //alert(temp);
}

function DisplayWord()
{
    var temp = "";

    for(var i = 0; i < word.length; i++)
    {
        temp += wordSoFar[i];
    }

    wordText.innerHTML = temp;
}

function checkForLetter(code)
{
    var foundLetter = false;


    for(var i = 0; i < word.length; i++)
    {
        if(word.substring(i,i+1) == code)
        {
            PlaceLetter(i, code);
            foundLetter = true;
        }
    }

    if(foundLetter == false)
    {
        guessesLeft--;
        guessesLeftText.innerHTML = "Guesses Left : "+guessesLeft;

        imgNum = Math.abs(guessesLeft-6);
        img.src = "images/sprite_"+imgNum+".png";
    }

    RemoveLetter(code);
}

function PlaceLetter(index, letter)
{
    wordSoFar[index] = " "+letter+" ";
    letters--;
    if(letters == 0)
    {
        EndGame();
    }
    DisplayWord();
}

function RemoveLetter(letter)
{
    for(var i = 0; i < notGuessedLetters.length; i++)
    {
        if(notGuessedLetters[i] == " "+letter+" ")
        {
            notGuessedLetters.splice(i,1);
        }
    }
    //alert(notGuessedLetters);

    DisplayLettersNotGuessed();

    if(guessesLeft == 0)
    {
        EndGame();
    }
}

function EndGame()
{
    playing = false;
    if(guessesLeft == 0)
    {
        guessesLeftText.innerHTML = "You Lose";

        var temp = "";
        for(var i = 0; i < word.length; i++)
        {
            temp += " "+word.charAt(i)+" ";
        }
        wordText.innerHTML = temp;
    }
    else
        guessesLeftText.innerHTML = "You Win";
}

document.addEventListener("keydown",function(e){
    if(playing == true && notGuessedLetters.includes(" "+e.key+" "))
    {
        var code = e.key;
        //alert(code)
        if(code != " ")
            checkForLetter(code);
    }
})

window.onload = Start();