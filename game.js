var gamePattern = [];
var userClickedPattern = [];
var level = 1;

$("body").on("keydown", function (e) {  
  if (e.key === "a" && level === 1) nextSequence();
});

function nextSequence() {
  var randomNUM = Math.floor(Math.random() * 4);
  var buttonColours = ["red", "blue", "green", "yellow"];
  var randomChosenColour = buttonColours[randomNUM];

  
  $("#level-title").text("Level " + level);
  level++;

  userClickedPattern = [];
  
  gamePattern.push(randomChosenColour);
  
  pressAnimate(randomChosenColour);
  playSound(randomChosenColour);
}

$(".btn").on("click", function (e) {
  
  ///vaild
  if (gamePattern.length === 0)
    return;

  var userChosenColour = $(this).attr("id");
  
  pressAnimate(userChosenColour);
  playSound(userChosenColour);
     
  var answer = checkAnswer(userChosenColour)
  ///error and goto initial
  if(!answer){
    startOver();
  }
  else if(answer && gamePattern.length === userClickedPattern.length){
    setTimeout( ()=>{
      nextSequence(); 
    }
    ,1000);       
  }    
});

function startOver() {
  playSound("wrong");
  $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  level = 1;
  gamePattern = [];
  userClickedPattern = [];
  $("h1").text("Press A Key to Start");
}

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function pressAnimate(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

function checkAnswer(userChosenColour){
  userClickedPattern.push(userChosenColour);

  return userClickedPattern[userClickedPattern.length-1] === gamePattern[userClickedPattern.length-1]
}
