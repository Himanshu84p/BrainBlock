let buttonColours = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

var started = false;
var level = 0;

$(".start-btn").click(function(){
    $(".start-btn").fadeIn(100).fadeOut(100).fadeIn(100)
    
    if (!started) {
        $("#level-title").text("Level  " + level);
        nextSequence();
        started = true;
        document.querySelector('.start-btn').classList.add("hide")
    } 
})

$(".btn").click(function (){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

       
})


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4)
    
    let randomChosenColor = buttonColours[randomNumber]
    gamePattern.push(randomChosenColor)

    $("#" +randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)

    playSound(randomChosenColor);
    
}    

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentcolor){
    $("#" + currentcolor).addClass("pressed")

    setTimeout (function(){
        $("#" + currentcolor).removeClass("pressed")
    },100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
                
            }, 1000)
        }
        
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over")
        $("#level-title").text("Oops!! Game Over,Please restart the game ")
        $(".start-btn").text("Restart")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        startedOver();    
}
}

function startedOver() {
    level = 0;
    gamePattern = [];
    started = false;
    document.querySelector('.start-btn').classList.remove("hide")
}