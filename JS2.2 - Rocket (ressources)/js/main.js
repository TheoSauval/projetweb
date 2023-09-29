'use strict';


let startButton = document.getElementById("firing-button");
let rocket = document.getElementById("rocket");
let timer = 10;
let printTimer = document.getElementById("timer")
printTimer.innerHTML = timer;
let firingInterval;
let stopButton = document.getElementById("cancel-button");



function startTimer() {
    rocket.src = "images/rocket2.gif";
    firingInterval = setInterval(stopAndFly, 1000);
    startButton.src = "/images/cancel-button.png"
}

function stopAndFly() {
    timer--;
    printTimer.innerHTML = timer;
    if (timer == 0) {
        clearInterval(firingInterval);
        rocket.classList.add('tookOff');
        rocket.src = "images/rocket3.gif";
    }
}

function stopTimer() {
    clearInterval(firingInterval);
    rocket.src = "images/rocket1.png";
}



startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);