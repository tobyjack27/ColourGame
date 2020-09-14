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
        console.log("Colour " + i + " is: " + colors[i]);
        console.log("Square " + i + " has color: " + squares[i].style.backgroundColor);
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
    return colors[random];
}

function randomColorsHard(num){
    // In hard mode, the programme divides numbers between 1 and 255 into four segments (i.e. 0–63, 64–128, 129–192, 193–255). It then creates a random array containing numbers one to four, and pops these off of the random array. The three numbers for each colour code are then generated from these numbers in that order. For example, if the selection is [2, 1, 4], the colors chosen will be within the ranges rgb(64–128, 1–63, 193–255).
    z = 255/4;
    segments = rand_arr(4);
    console.log("segment list is: " + segments)
    selection = [];
    for(var i=0; i<3; i++) {
        selection.push(segments.pop())
    }
    colors = [];
    for(var i=0; i<num; i++) {
        arr = [];
        for(var j=0; j<3; j++) {
            y = Math.floor(Math.random() * z);
            n = Math.floor(z*selection[j] + y);
            console.log(n)
            arr.push(n);
        }
        colors.push("rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")");
    }
    console.log("The colors are: " + colors)
    return colors
}

function randColorsEasy(num) {
    // In easy mode, the programme divides 255 by 18 and generates an array containing numbers 1 to 18 in a random order. It then pops the next number off the array each time it generates a new color, so each color code is from a different segment of 255.
    z = 255/18;
    segments = rand_arr(18);
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

function rand_arr(num) {
    segments = [];
    for(var i=0; i<num; i++) {
        segments.push(i);
    }
    segments_rand = []
    for(var i = 0; i<num; i++) {
        v = Math.floor(Math.random() * segments.length);
        y = segments[v];
        segments_rand.push(y)
        a = segments.slice(0, v);
        b = segments.slice(v+1);
        segments = a.concat(b)
    }
    return segments_rand;
}