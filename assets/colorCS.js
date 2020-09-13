var mode = 1
var numSquares = 6
var colors = randomColorsHard(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor;
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode")
var numButtons = document.querySelectorAll(".numSq")

init()

function init() {
    setupModeButtons()
    setupNumberButtons()
    setupSquares()
    reset()
}

function setupModeButtons() {
    resetButton.addEventListener("click", reset);
    for(var i=0; i<modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? mode = 1: mode = 2;
            reset();
        })
    };
}

function setupNumberButtons() {
    resetButton.addEventListener("click", reset);
    for(var i=0; i<numButtons.length; i++) {
        numButtons[i].addEventListener("click", function() {
            numButtons[0].classList.remove("selected");
            numButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Three" ? numSquares = 3: numSquares = 6;
            reset();
        })
    };
}

function setupSquares() {
    for(var i=0; i<squares.length; i++) {
        //assign colors to squares
        squares[i].style.backgroundColor = colors[i];
        console.log("Square " + i + " is colour: " + colors[i])
        //assign click selectors to squares
        squares[i].addEventListener("click", function(){
            //compare clicked color to pickedColor
            var clickedColor = this.style.backgroundColor
            if(clickedColor===pickedColor){
                changeColors(clickedColor);
                messageDisplay.textContent = "Correct!";
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play again?";
            } else {
                this.style.backgroundColor = "#232323"
                messageDisplay.textContent = "Try again!"
            }
        })
    };
}

function reset() {
    if(mode === 2){
        colors = randomColorsHard(numSquares);
    } else {
        colors = randColorsEasy(numSquares);
    }
    pickedColor = pickColor();
    console.log("Picked colour is " + pickedColor);
    colorDisplay.textContent = pickedColor;
    for(var i=0; i<squares.length; i++) {
        squares[i].style.display = "block";
        if(colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    messageDisplay.textContent = "";
    resetButton.textContent = "New colours";
    h1.style.background = "steelblue"
}

function changeColors(color) {
    for(var i=0; i<colors.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    console.log("picked colour: " + random)
    return colors[random];
}

function randomColorsHard(num){
    // 256 (the highest value for RGB) is divided into ten segments – 1-25, 26–50, etc. For hard colours, the programme randomly selects a segment, and then picks random numbers from within that segment for all of the colours. This means there is a much narrower range that colours can be selected from.
    colors = [];
    z = 256/6;
    x = Math.floor(Math.random() * 6);
    for(var i=0; i<num; i++){
        arr = [];
        for(var j=0; j<3; j++) {
            y = Math.floor(Math.random() * 256/6);
            n = Math.floor(z*x + y);
            arr.push(n);
        }
        colors.push("rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")");
    }
    console.log("The colors are: " + colors);
    return colors
}

function randColorsEasy(num) {
    // For easy colours, the programme generates an array containing numbers 1 to 18 in a random order. It then pops the next number off the array each time it generates a new color, so each color code is from a different segment of 256.
    z = 256/18;
    segments = rand_arr();
    colors = [];
    for(var j=0; j<num; j++){
        arr = []
        for(var i=0; i<3; i++){
            y = segments.pop();
            r = Math.random();
            n = Math.floor(r * z + y*z);
            arr.push(n);
        }
        colors.push("rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")");
    }
    console.log("The colors are: " + colors);
    return colors
}

function rand_arr() {
    segments = [];
    for(var i=1; i<19; i++) {
        segments.push(i);
    }
    segments_rand = []
    for(var i = 0; i<18; i++) {
        v = Math.floor(Math.random() * segments.length);
        y = segments[v];
        segments_rand.push(y)
        a = segments.slice(0, v);
        b = segments.slice(v+1);
        segments = a.concat(b)
    }
    return segments_rand;
}