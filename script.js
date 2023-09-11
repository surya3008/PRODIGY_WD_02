let isRunning = false;
let startTime;
let interval;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsList = document.getElementById("laps");

startStopButton.addEventListener("click", toggleStartStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", recordLap);

function toggleStartStop() {
    if (isRunning) {
        clearInterval(interval);
        startStopButton.textContent = "Start";
    } else {
        startTime = Date.now() - (startTime ? startTime : 0);
        interval = setInterval(updateDisplay, 10);
        startStopButton.textContent = "Stop";
    }
    isRunning = !isRunning;
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    display.textContent = formattedTime;
}

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function reset() {
    clearInterval(interval);
    display.textContent = "00:00:00";
    startStopButton.textContent = "Start";
    isRunning = false;
    lapsList.innerHTML = "";
}

function recordLap() {
    if (isRunning) {
        const elapsedTime = Date.now() - startTime;
        const formattedTime = formatTime(elapsedTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = formattedTime;
        lapsList.appendChild(lapItem);
    }
}