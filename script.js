const buttonPlay = document.querySelector(".play");
const buttonPause = document.querySelector(".pause");
const buttonStop = document.querySelector(".stop");
const buttonMore = document.querySelector(".more");
const buttonLess = document.querySelector(".less");
const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelector(".seconds");

let minutes = Number(minutesDisplay.textContent);
let timerTimeOut;

const buttonForest = document.querySelector("#forest");
const buttonRain = document.querySelector("#rain");
const buttonMarket = document.querySelector("#market");
const buttonFire = document.querySelector("#fire");

///// -----------------SOUNDSSSSSSSS -----------//////////////

const audioButtonPress = document.querySelector("#audioButtonPress");
const audioForest = document.querySelector("#audioForest");
const audioRain = document.querySelector("#audioRain");
const audioMarket = document.querySelector("#audioMarket");
const audioFire = document.querySelector("#audioFire");
const kitchenTimer = new Audio(
  "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true"
);

function timeEnd() {
  kitchenTimer.play();
}

function audioButton() {
  audioButtonPress.play();
}

let nowPlaying;

function playAudio(audio) {
  if (nowPlaying) {
    nowPlaying.pause();
  }
  audio.play();
  audio.loop = true;
  nowPlaying = audio;
}

/////////////////* -- TIMERRRRRRRRRRRRRR -- *////////////////

function updateDisplay(newMinutes, seconds) {
  newMinutes = newMinutes === undefined ? minutes : newMinutes;
  seconds = seconds === undefined ? 0 : seconds;
  minutesDisplay.textContent = String(newMinutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function resetControls() {
  buttonPlay.classList.remove("hide");
  buttonPause.classList.add("hide");
  buttonMore.classList.remove("hide");
  buttonLess.classList.remove("hide");
}

function countdown() {
  timerTimeOut = setTimeout(function () {
    let seconds = Number(secondsDisplay.textContent);
    let minutes = Number(minutesDisplay.textContent);
    let isFinished = minutes <= 0 && seconds <= 0;
    updateDisplay(minutes, 0);

    if (isFinished) {
      resetControls();
      timeEnd();
      updateDisplay();
      return;
    }

    if (seconds <= 0) {
      seconds = 60;

      minutesDisplay.textContent = String(minutes - 1).padStart(2, "0");
    }

    secondsDisplay.textContent = String(seconds - 1).padStart(2, "0");

    countdown();
  }, 1000);
}

/////////////////* -- PLAY E PAUSE EVENTOS E FUNCONES -- *////////////////

buttonPlay.addEventListener("click", function () {
  audioButton();
  buttonPause.classList.toggle("hide");
  buttonPlay.classList.toggle("hide");
  buttonMore.classList.add("hide");
  buttonLess.classList.add("hide");
  countdown();
});

buttonPause.addEventListener("click", function () {
  audioButton();
  clearTimeout(timerTimeOut);
  buttonPause.classList.toggle("hide");
  buttonPlay.classList.toggle("hide");
});

buttonStop.addEventListener("click", function () {
  resetControls();
  clearTimeout(timerTimeOut);
  updateDisplay();
});

buttonMore.addEventListener("click", function () {
  minutesDisplay.textContent = String(
    Number(minutesDisplay.textContent) + 1
  ).padStart(2, "0");
});

buttonLess.addEventListener("click", function () {
  if (minutesDisplay.textContent <= 0) {
    minutesDisplay = 0;
  } else {
    minutesDisplay.textContent = String(
      Number(minutesDisplay.textContent) - 1
    ).padStart(2, "0");
  }
});

/////////////////* -- TABELA LATERAL  -- *////////////////

buttonForest.addEventListener("click", function () {
  audioButton();
  playAudio(audioForest);
  buttonForest.classList.add("selected");
  buttonRain.classList.remove("selected");
  buttonMarket.classList.remove("selected");
  buttonFire.classList.remove("selected");
});

buttonRain.addEventListener("click", function () {
  audioButton();
  playAudio(audioRain);

  buttonForest.classList.remove("selected");
  buttonRain.classList.add("selected");
  buttonMarket.classList.remove("selected");
  buttonFire.classList.remove("selected");
});

buttonMarket.addEventListener("click", function () {
  audioButton();
  playAudio(audioMarket);

  buttonForest.classList.remove("selected");
  buttonRain.classList.remove("selected");
  buttonMarket.classList.add("selected");
  buttonFire.classList.remove("selected");
});

buttonFire.addEventListener("click", function () {
  audioButton();
  playAudio(audioFire);

  buttonForest.classList.remove("selected");
  buttonRain.classList.remove("selected");
  buttonMarket.classList.remove("selected");
  buttonFire.classList.add("selected");
});
