var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var scoreLevel = level;
var play = true;
$("h1").text("Play");
   $("h1").click(function(){
  playSound("play");
}); 

$("i").click(function(){
  playSound("play");
}); 
$(".play").on("click",function () {
  $("h1").addClass("transition");
  setTimeout(function(){
    $("h1").addClass("display-none"); 
  },500);

   $(".game").text("Level " + level);
    nextSequence();
    started = true;
    playLoop("scary");

  checkAnswer(userClickedPattern.length - 1);
});

$(".paragraph").click(function(){

})


$(".btn").on("click",function () {
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
    $(".btn").addClass("transition")
    var wrong = new Audio("sounds/fail.mp3");
    wrong.play();
    startOver();
    background();  
  }
}


function nextSequence() {
  level++;

  $(".game").text("Level " + level);
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  setTimeout(function(){
    $("img").css("opacity","100%");
      $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound("button");
  },1500);

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
  $("h1").removeClass("transition");
  $(".btn").removeClass("transition");
  $("h1").removeClass("display-none");
   $("h1").css("margin-top","200px");
     $("h1").text("Retry");
     if(level>scoreLevel){
      scoreLevel = level;
      $(".game").text("highest score :" + scoreLevel);
     }
level = 0;
}

function background(){

  $("body").addClass("new-background");
  $(".btn").addClass("no-imageAndBorder");
  $("h1").on("click",function(){
  $("body").removeClass("new-background"); 
  $(".btn").removeClass("no-imageAndBorder"); 
  });
}

function playLoop(sound){
  var keep = new Audio("sounds/"+sound+".mp3");
  keep.onended=playLoop;
    keep.play();
  }
