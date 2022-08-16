//Timer------------------------------------------------------

let timeBegan = null; //did the clock start
let timerStopped = null; //at what time timer stopped
let stoppedDuration = 0; //how long was the timer stopped
let startInterval = null; //needed to stop the startInterval() method
let flag = false; //control the start/stop of the timer;

const timerContainer = document.querySelector('.timer-container');

timerContainer.addEventListener('click', function () {
  if (!flag) {
    startTimer();
    flag = true;
  } else {
    stopTimer();
    flag = false;
  }
});

timerContainer.addEventListener('dblclick', function () {
  resetTimer();
});

function resetTimer() {
  clearInterval(startInterval);
  timeBegan = null;
  timerStopped = null;
  stoppedDuration = 0;
  document.querySelector('.timer-container__display').innerHTML =
    '00 : 00 : 00';
  flag = false;
}

function startTimer() {
  if (timeBegan === null) timeBegan = new Date();

  if (timerStopped !== null) stoppedDuration += new Date() - timerStopped;

  startInterval = setInterval(clockRunning, 10);
}

function stopTimer() {
  timerStopped = new Date();
  clearInterval(startInterval);
}

function clockRunning() {
  let currentTime = new Date();
  let timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);

  let minutes = timeElapsed.getUTCMinutes();
  let seconds = timeElapsed.getUTCSeconds();
  let milliseconds = timeElapsed.getUTCMilliseconds();

  milliseconds = Math.floor(milliseconds / 10);

  document.querySelector('.timer-container__display').innerHTML =
    (minutes = minutes < 10 ? '0' + minutes : minutes) +
    ' : ' +
    (seconds = seconds < 10 ? '0' + seconds : seconds) +
    ' : ' +
    (milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds);
}

//-----------------------------------------------------------
