var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", 'green', "yellow"];

var started = false;

var level = 0;


// Starting out the game

$(document).keydown(function() {
  if (started === false) {
    console.log("Game on!");
    startOver();
    nextSequence();
  } else {
  console.log("The game has already started!");
  }
});

// New game
function startOver() {
  gamePattern = [];
  level = 0;
  started = !started;
}

// Computer chooses button
function nextSequence() {
  userClickedPattern = []; //sets to 0
  var randomNumber = Math.floor(Math.random()*4); // new input
  var randomChosenColour = buttonColours[randomNumber]; // colour of new input
  gamePattern.push(randomChosenColour); // add colour to computer's sequence
  $("#" + randomChosenColour).fadeOut().fadeIn(); // animation
  playSound(randomChosenColour); // animation
  level = level +1; //level up
  $("h1").text("Level " + level); //level up
}


// User repeats pattern
$(".btn").click (function (event){
  // var userChosenColour = event.currentTarget.classList[1]; // colour of new input
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour); // add colour to player's sequence
  console.log(userChosenColour);
  animatePress(userChosenColour); // animation
  var currentLevel = userClickedPattern.length - 1; //index of the array
  if (started === false && level === 0) {
    userClickedPattern = [];
    gameOver();
    $("h1").text("We are not playing yet! Press any key to start");
  } else if (started === false && level > 0) {
    userClickedPattern = [];
    gameOver();
    $("h1").text("Game over :( Press any key to restart");
  } else {
    if (currentLevel === level - 1) { // last index of the array
    checkAnswer(currentLevel);
    if (started === true) { //
      console.log("Level-up!");
      playSound(userChosenColour); // animation
      setTimeout(nextSequence, 1000);
    } else {
      playSound(userChosenColour); // animation
      gamePattern = [];
    }
  } else if (currentLevel < level) { // more than one object in the array left
    checkAnswer(currentLevel); // check the answer and wait for the next input
    playSound(userChosenColour); // animation
  } else {
    console.log("Current level numbers gone mad!");
  }

  }

});

//Checking answer
function checkAnswer(currentLevel) {
   if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { // if guessed right
    console.log("success");
  } else { // game over
    console.log("wrong");
    gameOver();
    started = !started;
    $("h1").text("Game over :( Press any key to restart");
  }
}

// Animation

function playSound(colour) {
  if (started === true) {
    switch (colour) {

      case "red":
        var red = new Audio("./sounds/red.mp3");
        red.play();
        break;

      case "blue":
        var blue = new Audio("./sounds/blue.mp3");
        blue.play();
        break;

      case "green":
        var green = new Audio("./sounds/green.mp3");
        green.play();
        break;

      case "yellow":
        var yellow = new Audio("./sounds/yellow.mp3");
        yellow.play();
        break;

      default: console.log(randomChosenColour);

    }
  } else if (started === false) {
    switch (colour) {

      case "red":
      case "blue":
      case "yellow":
      case "green":
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        break;

      default: console.log(randomChosenColour);

    }
  }


}

// Animation

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed").delay(100).queue( function() {
    $(this).removeClass("pressed").dequeue();
  });
}

function gameOver() {
  $("body").addClass("game-over").delay(200).queue(function () {
    $(this).removeClass("game-over").dequeue();
  });
}
