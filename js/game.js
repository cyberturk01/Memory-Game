var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var level=0;
var started=false;

$(document).keypress(function(){
  if(!started){
  $("#level-title").text("Level "+level);
  nextSequence();
  started=true;
  }
});


function nextSequence(){
      userClickedPattern = [];
      level++;
      $("#level-title").text("Level "+level);
      var randomNumber= Math.floor(Math.random()*4);
      var randomChosenColor=buttonColours[randomNumber];
      gamePattern.push(randomChosenColor);
      console.log(randomChosenColor);
      $("#"+randomChosenColor).fadeOut('fast').fadeIn('fast');
      playSound(randomChosenColor);
}

function playSound(name){
        var blue =new Audio('sounds/'+name+'.mp3');
        blue.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed")
  }, 100);
}

$(".btn").click(function(){
  var userChosenColor= $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){  nextSequence();    },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

}
function startOver(){
  level=0;
  gamePattern=[];
  started= false;
}
