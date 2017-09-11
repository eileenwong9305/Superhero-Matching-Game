/*
 * Create a list that holds all of your cards
 */
var openedCard=[];
var clickCard;
var count=0;
var timer;
var start;
var previousTime=0;
var twoStar=14;
var oneStar=20;
var oldSuperhero=[];
var superhero = [
  "batman","baymax","captain-america","catwoman", "colossus","cyclops",
  "deadpool","flash","groot","harley-quinn","hellboy","hulk","ironman","joker",
  "leonardo","raphael","robocop","spiderman","storm","superman","thor",
  "wolverine","wolverine2","wonderwoman"
];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Shuffle the card and insert image to each card
 */
function prepareCard(){
  var superheroList = superhero.slice();
  superheroList = shuffle(superheroList);
  superheroList=superheroList.slice(0,8).concat(superheroList.slice(0,8));
  superheroList=shuffle(superheroList);
  var cardSeq =$(".card").first();
  for (var i=0; i<superheroList.length; i++){
    if (oldSuperhero.length!==0){
      cardSeq.find(".back").removeClass(oldSuperhero[i]);
    }
    cardSeq.find(".back").addClass(superheroList[i]);
    cardSeq=cardSeq.next();
  }
  oldSuperhero = superheroList.slice();
}

function resetStar(){
  $(".stars li:nth-child(3)").children().attr("src","images/star.png");
  $(".stars li:nth-child(2)").children().attr("src","images/star.png");
}
/*
 * Reset the game.
 */
function resetGame(){
  var match = $(".match, .front-open, .back-open");
  $(match).removeClass("front-open back-open match")
  openedCard=[];
  resetStar();
  count=0;
  $(".count").text(count);
  resetTimer();
}

function restartGame(){
  resetGame();
  setTimeout(function(){
    prepareCard();
    startTimer();
  },300);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 /*
  * Flip open the card
  */
function openCard(target){
  if(!($(target).hasClass("match")) && !($(target).hasClass("show"))) {
    console.log($(target));
    $(target).addClass("front-open show");
    $(target).siblings().addClass("back-open show");
    console.log(true);
    return true;
 }
 console.log(false);
 return false;
}

function addCard(target){
  openedCard.push($(target).siblings().attr("class").split(" ")[2]);
}

/*
 * Check if two cards are matched
 */
function checkMatch(target){
  var card = $(target).siblings().attr("class").split(" ")[2];
  var el=$(".show");
  if (card === openedCard[openedCard.length-1]){
    $(el).addClass("match");
    openedCard.push($(target).siblings().attr("class").split(" ")[2]);
  } else{
    $(el).addClass("wrong");
    $(el).effect( "shake", {distance:15, times:2},700);
    setTimeout(function(){
      $(el).removeClass("wrong front-open back-open");
    },700);
    openedCard.pop();
  }
  $(el).removeClass("show");
}

/*
 * Keep track of number of moves
 */
function keepCount(){
  count++;
  $(".count").text(count);
}

/*
 * Keep track of star rating based of number of moves made
 */
function starLevel(){
  if (count>twoStar){
    $(".stars li:nth-child(3)").children().attr("src","images/lost_star.png");
  }
  if(count>oneStar){
    $(".stars li:nth-child(2)").children().attr("src","images/lost_star.png");
  }
}

function countTime(){
  var now = new Date().getTime();
  var distance = now - start + previousTime;
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return [distance, minutes, seconds];
}

function startTimer(){
  start = new Date().getTime();
  timer = setInterval(function() {
    var time = countTime();
    $(".timer").text(time[1] + ":" + ("0" + time[2]).slice(-2));
  }, 1000);
}

function stopTimer(){
  var time = countTime();
  previousTime=time[0];
  clearInterval(timer);
  $(".time").text(time[1] + ":" + ("0" + time[2]).slice(-2));
}

function resetTimer(){
  previousTime=0;
  clearInterval(timer);
  $(".timer").text("0:00");
}
/*
 * Display result when game is completed
 */
function endGame(){
  if(openedCard.length===16){
    setTimeout(function(){
      stopTimer()
      $("#completeModal").modal('show');
    },700);

  }
}

// Open start modal on load
$(window).on('load', function() {
    $('#startModal').modal('show');
});

// Prompt user to start game
$("#start").on("click", function(){
  $( "#startModal" ).modal('hide');
  restartGame();
});

// Restart the game if user selects replay
$("#replay").on("click", function(){
  $( "#completeModal" ).modal('hide');
  restartGame();
});

// Restart game and reset timer when user click restart icon
$(".restart").on("click", function(){
  restartGame();
});

// Pause the timer and pop up pause modal
$(".pause").on("click",function(){
  stopTimer();
  $('#pauseModal').modal('show');
});

// Continue the game if users click continue button
$("#continue").on("click", function(){
  $( "#pauseModal" ).modal('hide');
  startTimer();
});

// Start a new game if users click new game button
$("#new-game").on("click", function(){
  $( "#pauseModal" ).modal('hide');
  restartGame()
});

$(".content").on("click", function(evt){
  var click=evt.target;
  if(openCard(click)){
    if (openedCard.length%2!==0){
      keepCount();
      starLevel();
      checkMatch(click);
    }else{
      addCard(click);
    }
    endGame();
  }
});
