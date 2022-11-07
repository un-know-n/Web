// Main params and variables

let timeBegan = null; // did the clock start
let timerStopped = null; // at what time timer stopped
let stoppedDuration = 0; // how long was the timer stopped
let startInterval = null; // needed to stop the startInterval() method
let flag = false; // control the start/stop of the timer;

const timerContainer = document.querySelector('.timer-container');

// Toggle the timer, depending on the flag
timerContainer.addEventListener('click', () => {
  if (!flag) {
    startTimer();
    flag = true;
  } else {
    stopTimer();
    flag = false;
  }
});

// Reset timer if double-click happened
timerContainer.addEventListener('dblclick', () => {
  resetTimer();
});

/**
 * Null all the values that needed for the timer functionality
 * and renew the DOM timer element
 *
 */
function resetTimer() {
  clearInterval(startInterval);
  timeBegan = null;
  timerStopped = null;
  stoppedDuration = 0;
  document.querySelector('.timer-container__display').innerHTML =
    '00 : 00 : 00';
  flag = false;
}

/**
 * To init all the needed timer values
 *
 */
function startTimer() {
  // Begin the timer
  if (timeBegan === null) timeBegan = new Date();

  // Take the stop-duration
  if (timerStopped !== null) stoppedDuration += new Date() - timerStopped;

  // Make the interval for the DOM timer renew
  startInterval = setInterval(clockRunning, 10);
}

/**
 * To take the stop timer time and disable the DOM changing
 *
 */
function stopTimer() {
  // Take the time of timer stoppage
  timerStopped = new Date();

  // Disable DOM changing
  clearInterval(startInterval);
}

/**
 * Redraw the timer in the DOM
 *
 */
function clockRunning() {
  // Take the current time
  const currentTime = new Date();

  // Set the right time on the timer(if the stoppage ever was)
  const timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);

  // Taking all the needed values to change the DOM
  let minutes = timeElapsed.getUTCMinutes();
  let seconds = timeElapsed.getUTCSeconds();
  let milliseconds = timeElapsed.getUTCMilliseconds();

  milliseconds = Math.floor(milliseconds / 10);

  // Assign all the values to the DOM
  document.querySelector('.timer-container__display').innerHTML = `${(minutes =
    minutes < 10 ? `0${minutes}` : minutes)} : ${(seconds =
    seconds < 10 ? `0${seconds}` : seconds)} : ${(milliseconds =
    milliseconds < 10 ? `0${milliseconds}` : milliseconds)}`;
}

//-----------------------------------------------------------
