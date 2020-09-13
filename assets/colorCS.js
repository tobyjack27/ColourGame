var numSquares = 6
var colors = randomColorsHard(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor;
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode")

init()

function init() {
    setupModeButtons()
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
            console.log(this);
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        })
    };
}

function setupSquares() {
    for(var i=0; i<squares.length; i++) {
        //assign colors to squares
        squares[i].style.backgroundColor = colors[i];
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
    if(numSquares === 6){
        colors = randomColorsHard(6);
    } else {
        colors = randColorsEasy(3);
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
    colors = [];
    for(var i=0; i<num; i++){
        arr = [];
        z = 256/10;
        x = Math.floor(Math.random() * 10);
        for(var j=0; j<3; j++) {
            y = Math.floor(Math.random() * 256/10);
            n = Math.floor(z*x + y);
            arr.push(n);
            console.log(arr)
        }
        colors.push("rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")");
        console.log(colors)
    }
    return colors
}

function randColorsEasy(num) {
    z = 256/6
    segments = [];
    for(var i=1; i<7; i++){
        segments.push(i);
    }
    colors = []
    for(var j=0; j<num; j++){
        console.log("Segments array: " + segments)
        v = Math.floor(Math.random() * segments.length);
        y = segments.slice(v, v+1);
        console.log("Segment selected is: " + y);
        a = segments.slice(0, v);
        b = segments.slice(v+1);
        segments = a.concat(b)
        arr = []
        for(var i=0; i<3; i++){
            arr.push(Math.floor(Math.random() * z + v*z));
        }
        console.log("numbers are: " + arr);
        colors.push("rgb(" + arr[0] + ", " + arr[1] + ", " + arr[2] + ")");
    }
    return colors
}