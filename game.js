
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];    
var level = 0;


$(document).one("keypress",function(){

        $("h1").text("Level " + level);
        nextSequence();
   
});

function nextSequence(){
    
    userClickedPattern = [];
    var randomNumber = Math.random();
    randomNumber = randomNumber * 4
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    var button = $("#" + randomChosenColour).attr("id");;
    playSound(button);
    level = level + 1
    $("h1").text("Level " + level);

    
}

$(".btn").click(function(){

        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
        
});

function playSound(name){

    switch (name) {
        case 'red':
            var button1 = new Audio("sounds/red.mp3");
            button1.play();
            break;
        case 'blue':
            var button2 = new Audio("sounds/blue.mp3");
            button2.play();
            break;
        case 'green':
            var button3 = new Audio("sounds/green.mp3");
            button3.play();
            break; 
        case 'yellow':
            var button4 = new Audio("sounds/yellow.mp3");
            button4.play();
            break;   
    
        default:
            break;
    }

}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("Success");

        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
                
            },1000)
        }

    }else{
        var buttonWrong = new Audio("sounds/wrong.mp3");
        buttonWrong.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press any key to restart the game")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    $(document).one("keypress",function(){
        nextSequence();
   
});
}

