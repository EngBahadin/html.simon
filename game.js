var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var scoreLevel = level;
var play = true;
$("h1").text("Play");
$("h1").click(function () {
  playSound("play");
});

$("i").click(function () {
  playSound("play");
}); // this doesnt work!

$(".play").on("click", function () {
  $("h1").addClass("transition");
  setTimeout(function () {
    $("h1").addClass("display-none");
  }, 500);

  $(".gameLevel").text("Level " + level);
  nextSequence();
  started = true;
  playLoop("scary");

  checkAnswer(userClickedPattern.length - 1);
});


$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1)
  playSound("correct");
  animatePress(userChosenColour);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, );

    }
  } else {
    // $(".btn").addClass("transition"); 
    wrong.play();
    startOver();
    background();
  }
}


function nextSequence() {
  level++;
  $(".gameLevel").text("Level: " + level);
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  setTimeout(function () {
    $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound("button");
  }, 1500);

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

function startOver() {
  gamePattern = [];
  started = false;
  $("h1").removeClass("transition display-none");
  $(".btn").removeClass("transition");
  $("h1").css("margin-top", "200px");
  $("h1").text("Retry");
  if (level > scoreLevel) {
    scoreLevel = level;
    $(".gameLevel").text("YOU SCORED A NEW RECORD: " + scoreLevel);
  } else {
    $(".gameLevel").text("YOU LOST, YOU BROUGHT SHAME TO YOUR FAMILY LEVEL: " + scoreLevel);
  }
  level = 0;
}

function background() {

  $("body").addClass("new-background");
  $(".container").addClass("no-imageAndBorder");
  $("h1").on("click", function () {
    wrong.pause();
    wrong.currentTime = 0;
    $("body").removeClass("new-background");
    $(".container").removeClass("no-imageAndBorder");
  });
}

function playLoop(sound) {
  var keep = new Audio("sounds/" + sound + ".mp3");
  keep.onended = playLoop;
  keep.play();
}

const wrong = new Audio("sounds/fail.mp3");

