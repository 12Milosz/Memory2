let startTime;
let elapsedTime = 0;
let timerInterval;

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateStopwatch, 10);
}

function updateStopwatch() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  displayStopwatch(elapsedTime);
}

function displayStopwatch(elapsedTime) {
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

  const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
  document.querySelector(".timer").textContent = formattedTime;
}

function pad(value) {
  return value < 10 ? `0${value}` : value;
}

function stopStopwatch() {
  clearInterval(timerInterval);
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  displayStopwatch(elapsedTime);
}

startStopwatch();
