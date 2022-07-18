const dealerHand = document.getElementById("dealer");
const playerHand = document.getElementById("player");
const playerSecondHand = document.getElementById("player2nd");

const dealerVal = document.getElementById("dealerVal");
const playerVal = document.getElementById("playerVal");
const playerVal2 = document.getElementById("playerVal2");

const buttons = document.getElementById("buttons");
const endText = document.getElementById("end");

const chipsText = document.getElementById("chips");
var chips = 100;
var currentGame;

const cards = [["d", "h", "c", "s"], ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]];

class game{

    constructor()
    {
        this.wait = false;
        this.ante = 0;
        this.dealer = [];
        this.dV = 0;
        this.hide = true;
        this.player = [[]];
        this.currentHand = 0;
        this.pV = 0;
        this.pV2 = 0;
        this.playerTurn = true;
        this.deck = [];
        for(var i = 0; i < 4; i++)
        {
            for(var j = 0; j < 13; j++)
            {
                this.deck.push(cards[0][i]+"-"+cards[1][j]);
            }
        }
        this.shuffle();
    }

    shuffle()
    {
        var newDeck = [];
            
        for(var i = 0; i < 52; i++)
        {
            var card = this.deck.splice(parseInt(Math.random()*this.deck.length), 1);
            newDeck.push(card[0]);
        }
        this.deck = newDeck;
    }

    newDeck()
    {
        this.deck = [];
        for(var i = 0; i < 4; i++)
        {
            for(var j = 0; j < 13; j++)
            {
                this.deck.push(cards[0][i]+"-"+cards[1][j]);
            }
        }
        this.shuffle();
    }

    start()
    {
        this.player[0].push(this.deck.splice(0,1)[0]);
        this.dealer.push(this.deck.splice(0,1)[0]);
        this.player[0].push(this.deck.splice(0,1)[0]);
        this.dealer.push(this.deck.splice(0,1)[0]);
        buttons.style.display = "inline";
        endText.style.display = "none";
        playerHand.className = "playerActive";
    }

    update()
    {
        //clear 
        while(dealerHand.hasChildNodes())
            dealerHand.removeChild(dealerHand.childNodes[0]);
        while(playerHand.hasChildNodes())
            playerHand.removeChild(playerHand.childNodes[0]);
        while(playerSecondHand.hasChildNodes())
            playerSecondHand.removeChild(playerSecondHand.childNodes[0]);

        playerVal2.innerHTML = "";

        //dealer
        for(var i = 0; i < this.dealer.length; i++)
        {
            var card = this.makeCard(this.dealer[i], (i == 1 && this.hide));
            dealerHand.append(card);
        }
        this.dV = this.calcVal(this.dealer);
        if(!this.hide)
            dealerVal.innerHTML = "Dealer's Value : "+this.dV;
        else 
            dealerVal.innerHTML = "Dealer's Value : ?";    

        //player
        for(var i = 0; i < this.player[0].length; i++)
        {
            var card = this.makeCard(this.player[0][i]);
            playerHand.append(card);
        }
        this.pV = this.calcVal(this.player[0]);
        playerVal.innerHTML = "Player's Value : "+this.pV;

        if(this.player.length > 1)
        {
            for(var i = 0; i < this.player[1].length; i++)
            {
                var card = this.makeCard(this.player[1][i]);
                playerSecondHand.append(card);
            }
            this.pV2 = this.calcVal(this.player[1]);
            playerVal2.innerHTML = "Player's 2nd Value : "+this.pV2;
        }

        if(this.currentHand == 0 && this.playerTurn)
        {
            playerHand.className = "playerActive";
            playerSecondHand.className = "player";
        }
        else if(this.currentHand == 1 && this.playerTurn)
        {
            playerHand.className = "player";
            playerSecondHand.className = "playerActive";
        }
        else
        {
            playerHand.className = "player";
            playerSecondHand.className = "player";
        }
    }

    makeCard(cardInfo, hide)
    {
        var card = document.createElement("div");
        card.className = "card";
        var cardImg = document.createElement("div");
        cardImg.className = "img";
        var cardTopLeft = document.createElement("div");
        cardTopLeft.className = "topLeftVal";
        var cardBottomRight = document.createElement("div");
        cardBottomRight.className = "bottomRightVal";

        var img = new Image(50, 50);

        switch(cardInfo.substring(0,1))
            {
                case "h":
                    img.src = "BlackJack/images/heart.png"
                    break;
                case "d":
                    img.src = "BlackJack/images/diamond.png"
                    break;
                case "c":
                    img.src = "BlackJack/images/club.png"
                    break;
                case "s":
                    img.src = "BlackJack/images/spade.png"
                    break;
            }
        cardImg.append(img);
        cardTopLeft.innerHTML = cardInfo.substring(2);
        cardBottomRight.innerHTML = cardInfo.substring(2);
        if(!hide)
            card.append(cardImg, cardTopLeft, cardBottomRight);
        return card;
    }

    calcVal(hand)
    {
        var total = 0;
        var aces = 0;
        for(var i = 0; i < hand.length; i++)
        {
            var val = hand[i].substring(2);
            if(val == "A")
                aces += 1;
            else if(val == "J" || val == "Q" || val == "K")
                total += 10;
            else 
                total += parseInt(val); 
        }
        for(var i = 0; i < aces; i++)
        {
            if(total + 11 <= 21)
                total += 11;
            else 
                total += 1;
        }
        return total;
    }

    addCard(user)
    {
        if(user == "player")
            this.player[this.currentHand].push(this.deck.splice(0,1)[0]);
        else
            this.dealer.push(this.deck.splice(0,1)[0]);
    }

    async dealerTurn()
    {
        if(this.dV < 17){
            this.addCard("dealer");
            this.update();
            this.dealerTurn();
        }
        else 
        {
            this.end();
        }

        await sleep(500);
    }

    async end()
    {
        await sleep(500);
        endText.style.display = "inline";
        buttons.style.display = "none";

        var text = "";
        if(this.pV > this.dV && this.pV == 21 && this.player[0].length == 2)
        {
            text += "BlackJack - You won "+this.ante*3+" chips!";
            chips += this.ante * 3;
        }
        else if(this.pV > this.dV && this.pV <= 21) 
        {
            text += "You won "+this.ante*2+" chips!";
            chips += this.ante * 2;
        }
        else if(this.dV > 21 && this.pV <= 21)
        {
            text += "You won "+this.ante*2+" chips!";
            chips += this.ante * 2;
        }
        else 
        {
            text += "The dealer wins";
        }

        if(this.player.length == 2)
        {
            text += " and ";
            if(this.pV2 > this.dV && this.pV2 == 21 && this.player[1].length == 2)
            {
                text += "BlackJack - You won "+this.ante*3+" chips!";
                chips += this.ante * 3;
            }
            else if(this.pV2 > this.dV && this.pV2 <= 21) 
            {
                text += "You won "+this.ante*2+" chips!";
                chips += this.ante * 2;
            }
            else if(this.dV > 21 && this.pV2 <= 21)
            {
                text += "You won "+this.ante*2+" chips!";
                chips += this.ante * 2;
            }
            else 
            {
                text += "The dealer wins";
            }
        }

        endText.innerHTML = text;
        chipsText.innerHTML = "Chips : "+chips;
        postData();
    }
}

async function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function NewGame()
{
    var ante = document.getElementById("ante");
    ante = ante.value;
    var play = true;
    //console.log(ante);

    if(ante == null || ante == "" || ante > chips || ante <= 0)
    {
        play = false;
        alert("ante must be a number less than or equal to chips and greater than 0");
    }

    if(play)
    {
        chips -= ante;
        chipsText.innerHTML = "Chips : "+chips;
        while(dealerHand.hasChildNodes())
            dealerHand.removeChild(dealerHand.childNodes[0]);
        while(playerHand.hasChildNodes())
            playerHand.removeChild(playerHand.childNodes[0]);
        currentGame = new game();
        currentGame.ante = ante;
        currentGame.start();
        currentGame.update();
        if(currentGame.pV == 21)
        {
            stay();
        }
    }
}

async function hit()
{
    if(currentGame != undefined && currentGame.playerTurn && !currentGame.wait) 
    {
        currentGame.addCard("player");
        currentGame.update();

        currentGame.wait = true;
        await sleep(500);

        if(currentGame.pV == 21 && currentGame.playerTurn && currentGame.player.length == 1){
            currentGame.wait = false;
            stay();
        }
        else if(currentGame.pV > 21 && currentGame.playerTurn && currentGame.player.length == 1){
            currentGame.end();
        }
        else if(currentGame.pV2 > 21 && currentGame.playerTurn && currentGame.player.length == 2){
            currentGame.wait = false;
            stay();
        }
        else if(currentGame.pV2 == 21 && currentGame.playerTurn && currentGame.player.length == 2){
            currentGame.wait = false;
            stay();
        }
        else if(currentGame.pV > 21 && currentGame.playerTurn && currentGame.player.length == 2 && currentGame.currentHand == 0){
            currentGame.wait = false;
            stay();
        }
        currentGame.wait = false;
    }
}

async function stay()
{
    if(currentGame != undefined && currentGame.playerTurn && !currentGame.wait && currentGame.player.length == 1)
    {
        buttons.style.display = "none";
        currentGame.playerTurn = false;
        currentGame.hide = false;
        currentGame.update();
        await sleep(500);
        currentGame.dealerTurn();
    }
    else if(currentGame != undefined && currentGame.playerTurn && !currentGame.wait && currentGame.player.length == 2 && currentGame.currentHand == 0)
    {
        currentGame.currentHand = 1;
        currentGame.update();
    }
    else if(currentGame != undefined && currentGame.playerTurn && !currentGame.wait && currentGame.player.length == 2 && currentGame.currentHand == 1)
    {
        buttons.style.display = "none";
        currentGame.playerTurn = false;
        currentGame.hide = false;
        currentGame.update();
        await sleep(500);
        currentGame.dealerTurn();
    }
}

async function split()
{
    if(currentGame != undefined && currentGame.playerTurn && !currentGame.wait) 
    {
        if(currentGame.player[0].length == 2 && (currentGame.player[0][0].substring(2) == currentGame.player[0][1].substring(2)))
        {
            chips -= currentGame.ante;
            var temp = currentGame.player[0].splice(1,1);
            currentGame.player[1] = temp;
            currentGame.update();
        }
    }
}

//save chips to database
async function getData()
{
    var temp = await getGameData("ChipCount");
    if(temp != null)
    {
        chips = parseInt(temp);
        chipsText.innerHTML = "Chips : "+chips;
    }
}

async function postData()
{
    postGameData("ChipCount", chips);
}

//Decoration
async function spin()
{
    rot += 2;
    heart.style.transform = "RotateY("+rot+"deg)";
    diamond.style.transform = "RotateY("+rot+"deg)";
    club.style.transform = "RotateY("+rot+"deg)";
    spade.style.transform = "RotateY("+rot+"deg)";
}

var spinner = setInterval(spin, 1000/60);
var rot = 0;
var heart = document.getElementById("heart");
var diamond = document.getElementById("diamond");
var club = document.getElementById("club");
var spade = document.getElementById("spade");


getData();