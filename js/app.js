const array = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];

var arr2 = array.concat(array);

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const cardsContainer = document.querySelector(".deck");
let openCards = [];
let matchedCards = [];

/*
* Initialize the Game.
*/
function init() {
  for (let i = 0 ; i <arr2.length ; i++){
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${arr2[i]}"></i>`;
    cardsContainer.appendChild(card);

    //Add Click event to each Card
    click(card);
  }
};

/*
*Add Click Event
*/


// First Click Indicator
let isFirstClick = true;

function click(card){

  // card click Event

  card.addEventListener('click' , function(){
    /*
    * At the first click, the condition will be true,
    * and our code below will get executed!
    *
    * We will call our `startTimer` function,
    * Then, set the `isFirstClick` to `false`, so in the next click,
    * it will be `if(false)` and nothing will happen, as we don't have an `else`!
    *
    * THAT'S EXACTLY what we want!
    */
    if(isFirstClick) {
        // Start our timer
        startTimer();
        // Change our First Click indicator's value
        isFirstClick = false;
    }
    const currentCard = this;
    const prevCard = openCards[0];

    if (openCards.length === 1 ){

      card.classList.add('open','show','disable');
      openCards.push(this);

      compare(currentCard,prevCard);

    }else{
      card.classList.add('open','show','disable');
      openCards.push(this);
    }
  })
};


/*
* Compare 2 matched Cards;
*/

function compare(currentCard, prevCard){
  if (currentCard.innerHTML === prevCard.innerHTML){
    // they are matched
    currentCard.classList.add("match");
    prevCard.classList.add("match");

    matchedCards.push("currentCard","prevCard");
    openCards = [];
    isOver();

  }else {
    // Wait 500 ms to do this .....
    setTimeout(function(){
      currentCard.classList.remove("open","show","disable");
      prevCard.classList.remove("open","show","disable");
    },500)
  openCards = [];
  }
  addMoves();
}

/*
*Check if the Game is Over
*/

function isOver(){
    setTimeout(function(){
      if( matchedCards.length === arr2.length){
        // Stop our timer
        stopTimer();
        // popup Window
        swal({
          title: "Good Job! You Made "+document.querySelector('span').innerHTML+" Moves To Complete It",
          text: " And you took "+document.querySelector('.timer').innerHTML+ " of Time",
          icon: "success",
          button: "Try Again!",
        });
      }
    },300)
  };


/*
* Restart Button to reset
*/
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener('click',function(){
  // Delete all cards.
  cardsContainer.innerHTML="";
  // initialize from the begenining.
  init();
  // Reset Variables
  shuffle(arr2);
  matchedCards=[];
  moves = 0;
  movesContainer.innerHTML = moves;
  rating();
  reset();
});

/*
* Rating Section
*/

const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;

function rating(){
  switch (moves) {

    case 0 :
    starsContainer.innerHTML = star + star + star;
    break;

    case 20:
      starsContainer.innerHTML = star + star
      break;

    case 26:
      starsContainer.innerHTML = star
      break;

    case  34:
    starsContainer.innerHTML = "";
  }
};


/*
* Moves counter function
*/
const movesContainer = document.querySelector('.moves');
movesContainer.innerHTML = 0;
let moves = 0;
function addMoves(){
  moves++;
  movesContainer.innerHTML = moves;
  rating();
};


/*
*Timer
*/
/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + 's';

/*
 * We call this function to start our function,
 * the totalSeconds will be increased
 * by 1 after 1000ms (1 second!)
 *
 * HINT: We need to call this function ONCE, and the best time to call it
 * is when the user click on a card (The first card!)
 * This means that our user is start playing now! ;)
 */
 function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}

/*
 * Stop Timer Function
 */
function stopTimer() {
    clearInterval(liveTimer);
}



/*
* Reset All Game
*/

function reset() {
    // Empty the `matchedCards` array
    matchedCards = [];

    // Reset moves
    moves = 0;
    movesContainer.innerHTML = moves;

    // Reset rating
    starsContainer.innerHTML = star + star + star;

    /*
     * Reset the timer
     */
    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";
}


// ///////// start the Game for first time.
shuffle(arr2);
init();
