var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChoosenColor = this.id;
  userClickedPattern.push(userChoosenColor);
  checkAnswer(userClickedPattern.length - 1);
  playSound(this.id);
  addAnimation(this.id);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }


  }else{
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },300);
    $("h1").text("Game Over,Press any key to restart");
    $(".madeby").fadeOut();
    $(".madeby").text("Better Luck next time!!");
    $(".madeby").fadeIn();
    console.log("wrong");
    setTimeout(function(){
      restart();
    },3000);
  }
}

function restart(){
  level = 0;
  gamePattern = [];
  started = false;
  $(".madeby").text("Made by Raunak Jasrasaria");
}

function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function addAnimation(clicked){
  $("#"+clicked).addClass("pressed");
  setTimeout(function() {
    $("#"+clicked).removeClass("pressed");
}, 100);
}
