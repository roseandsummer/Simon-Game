var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var gameStarted = false;

$(".btn").click(function () {
  var userChosenColor = this.getAttribute("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    //answer is right, do nothing
    checkIfFinished(currentLevel);
  } else {
    //game over
    //screen turns red 2. "Game Over, Press Any Key to Restart"
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over"),
        $("#level-title").text("Game Over, Press Any Key to Restart");
      restart();
    }, 200);
  }
}

function checkIfFinished() {
  if (userClickedPattern.length == gamePattern.length) {
    //!important : first parameter is function reference , not to call functions
    setTimeout(nextSequence, 1000);
    userClickedPattern = [];
  }
}

/**
 * after a button is clicked
 * check current element with the same index in userClickedPattern == the element with same index in gamePattern;
        --not, game ends
        -- same, when gamePattern.length == userClickedPattern.length  is the same, call nextSequence();
 *                                      not equal, wait for next button to be clicked
 * 
 * if()
 */

function nextSequence() {
  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  level++;

  if (gameStarted) {
    $("#level-title").html("Level " + level);
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown(function () {
  if (!gameStarted) {
    gameStarted = true;

    nextSequence();
  }
});

function restart() {
  gameStarted = false;
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}
