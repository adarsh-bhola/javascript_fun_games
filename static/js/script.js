//Challenge 1:Your Age in days
function ageIndays() {
    var birth_year=prompt('What year were you born..Good fellow?');
    var ageindays=(2020-birth_year)*365;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode('You are '+ageindays+' days old');
    h1.setAttribute('id','ageIndays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageIndays').remove();
}

//Challenge 2:Cat generator
function generateCat() {
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

//Challenge 3:Rock,Paper,Scissors
var flag=false;
function rpsGame(yourChoice) {
    //console.log(yourChoice);
    var humanChoice,botChoice;
    humanChoice=yourChoice.id;
    botChoice=numberToChoice(randtoRpsInt());
    results=decideWinnner(humanChoice,botChoice);   //[0,1]-->Human Lost,[1,0]-->Human Won,[0.5,0.5]-->Human Draw
    message=finalMessage(results);                  //{'message':'You Won!','color':'green'}
    rpsFrontEnd(humanChoice,botChoice,message);
}

function randtoRpsInt() {
    return Math.floor(Math.random()*3);
}

function numberToChoice(number) {
    return ['rock','paper','scissors'][number];
}

function decideWinnner(yourChoice,computerChoice) {
    var rpsDatabase={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0},
    }

    var yourScore=rpsDatabase[yourChoice][computerChoice];
    var computerScore=rpsDatabase[computerChoice][yourChoice];
    return [yourScore,computerScore];
}

function finalMessage([yourscore,computerscore]) {
    if(yourscore===0)
    {
        return {'message':'You Lost!','color':'red'};
    }
    else if(yourscore===1)
    {
        return {'message':'You Won!','color':'green'};
    }
    else if(yourscore===0.5)
    {
        return {'message':'You Tied!','color':'yellow'};
    }
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage) {
    var ImageDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src,
    }
    //let's remove all the objects
    //document.getElementById('rock').remove();
    //document.getElementById('paper').remove();
    //document.getElementById('scissors').remove();

    //create new divs and append new objects in that
    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    //Set id's for the above div's
    humanDiv.setAttribute('id','humandiv');
    botDiv.setAttribute('id','botdiv');
    messageDiv.setAttribute('id','messagediv');

    humanDiv.innerHTML="<img src='"+ImageDatabase[humanImageChoice]+"' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML="<h1 style='color:"+finalMessage['color']+"; font-size: 60px; padding: 30px; '>"+finalMessage['message']+"</h1>"
    botDiv.innerHTML="<img src='"+ImageDatabase[botImageChoice]+"' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"

    if(flag===false)
    {
        document.getElementById('flex-box-rps-result-div').appendChild(humanDiv);
        document.getElementById('flex-box-rps-result-div').appendChild(messageDiv);
        document.getElementById('flex-box-rps-result-div').appendChild(botDiv);
    }
    flag=true;
}

function Reset() {
    if(flag===true)
    {
        document.getElementById('humandiv').remove();
        document.getElementById('botdiv').remove();
        document.getElementById('messagediv').remove();
    }
    flag=false;
}

//Challenge 4:Change the Color of All buttons!
var all_buttons=document.getElementsByTagName('button');

var copyAllbuttons=[];
for(let i=0;i<all_buttons.length;i++)
{
    copyAllbuttons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy)
{
    if(buttonThingy.value==='red')
    {
        buttonsRed();
    }
    else if(buttonThingy.value==='green')
    {
        buttonsGreen();
    }
    else if(buttonThingy.value==='reset')
    {
        buttonColorReset();
    }
    else if(buttonThingy.value==='random')
    {
        randomColors();
    }
}

function buttonsRed(){
    for(let i=0;i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i=0;i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for(let i=0;i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllbuttons[i]);
    }
}

function randomColors(){
    var choices=['btn-primary','btn-success','btn-danger','btn-warning']
    for(let i=0;i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[Math.floor(Math.random()*4)]);
    }
}

//Challenge 5:Blackjack
let blackjackGame ={
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isHit':false,
    'isStand':false,
    'turnsOver':false,
};

const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];

const hitSound=new Audio('static/sounds/swish.m4a');
const winSound=new Audio('static/sounds/cash.mp3');
const loseSound=new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit() {
    if(blackjackGame['isStand']===false)
    {
        let card=randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
        blackjackGame['isHit']=true;
    }
}

function randomCard() {
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer) {
    if(activePlayer['score']<=21) {
        let cardImage=document.createElement('img');
        cardImage.src=`static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if(blackjackGame['turnsOver']===true)
    {
        blackjackGame['isStand']=false;

        let yourImages=document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
        for(var i=0;i<yourImages.length;i++)
        {
            yourImages[i].remove();
        }

        for(var j=0;j<dealerImages.length;j++)
        {
            dealerImages[j].remove();
        }
        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;

        document.querySelector('#your-blackjack-result').style.color='#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

        document.querySelector('#blackjack-result').textContent="Let's play";
        document.querySelector('#blackjack-result').style.color='black';

        blackjackGame['turnsOver']=false;
    }
}

function updateScore(card,activePlayer) {
    if(card==='A')
    {
        //If adding 11,keeps the score below 21,then add 11 otherwise,add 1
        if((activePlayer['score']+blackjackGame['cardsMap'][card][1])<=21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if(activePlayer['score']>21)
    {
        document.querySelector(activePlayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic() {
    if(blackjackGame['isHit']===true)
    {
        blackjackGame['isStand']=true;
    }

    while(DEALER['score']<16 && blackjackGame['isStand']===true && blackjackGame['isHit']===true)
    {
        let card=randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    if(blackjackGame['isHit']===true)
    {
        blackjackGame['turnsOver']=true;
        showResult(computeWinner());
    }
    blackjackGame['isHit']=false;
}

// compute winner and return who just won
function computeWinner() {
    let winner;

    if(YOU['score'] <= 21)
    {
        //condition: higher score than dealer or when dealer busts but you're under or equal to 21
        if(YOU['score'] > DEALER['score'] || DEALER['score']>21 )
        {
            blackjackGame['wins']++;
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score'])
        {
            blackjackGame['losses']++;
            winner=DEALER;
        }
        else if(YOU['score'] === DEALER['score'])
        {
            blackjackGame['draws']++;
        }
    }
    //condition:When user busts! but dealer doesn't
    else if(YOU['score']>21 && DEALER['score']<=21) {
        blackjackGame['losses']++;
        winner=DEALER;
    }
    //condition:When YOU AND DEALER BUSTS
    else if(YOU['score']>21 && DEALER['score']>21) {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner) {
    let message,messageColor;
    if(blackjackGame['turnsOver']===true)
    {
        if(winner===YOU) {
            document.querySelector('#wins').textContent=blackjackGame['wins'];
            message='YOU WON!';
            messageColor='green';
            winSound.play();
        }
        else if(winner===DEALER) {
            document.querySelector('#losses').textContent=blackjackGame['losses'];
            message='YOU Lost!';
            messageColor='red';
            loseSound.play();
        }
        else {
            document.querySelector('#draws').textContent=blackjackGame['draws'];
            message='YOU Drew!';
            messageColor='yellow';
        }
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messageColor;
    }
}