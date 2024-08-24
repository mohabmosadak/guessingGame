"use strict";
// Define The audio files
let won = new Audio("audio/win.mp3");
let lost = new Audio("audio/lose.mp3");
let again = new Audio("audio/again.mp3");

// play starting audio
again.play();

// Define The Random Number.
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// Define The Score
let score = 20;

//stop function to stop check button and forbid the player from entering values
const stopFunc = function (status) {
  document.querySelector(".guess").disabled = status;
  document.querySelector(".check").disabled = status;
};

// Event Listener for the guess button click
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  // If the user didn't enter a guess
  if (!guess)
    document.querySelector(".message").textContent = "Please enter a guess.";
  // If the user entered a number out of range
  else if (guess < 0 || guess > 20)
    document.querySelector(".guess").textContent =
      "Please enter a number between 1 and 20";
  // If the user guessed correctly
  else if (guess === secretNumber) {
    won.play();
    document.querySelector("body").style.backgroundColor = "#5D9C59";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".message").textContent = "Correct Number!.";
    if (score > document.querySelector(".highscore").textContent)
      document.querySelector(".highscore").textContent = score;
    stopFunc(true);
  }
  // Check the difference between the number and the guess.
  else if (guess > secretNumber) {
    // decrease the score
    score--;
    document.querySelector(".message").textContent =
      guess - secretNumber <= 3 ? "A little bit High..." : "Too High!";
  } else if (guess < secretNumber) {
    // decrease the score
    score--;
    document.querySelector(".message").textContent =
      Math.abs(guess - secretNumber) <= 3 ? "A little bit Low..." : "Too Low!";
  }
  if (score === 0) {
    lost.play();
    document.querySelector("body").style.backgroundColor = "#DF2E38";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".message").textContent = "Game Over! You Lost.";
    stopFunc(true);
  }
  document.querySelector(".score").textContent = score;
});

// Event Listener for the again button click
document.querySelector(".again").addEventListener("click", function () {
  again.play();
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".number").textContent = "?";
  score = 20;
  document.querySelector(".message").textContent = "Start guessing...";
  stopFunc(false);
  document.querySelector(".guess").value = "";
  document.querySelector(".score").textContent = score;
});

// preventing the user from using devtools
window.addEventListener("keydown", e =>
  e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")
    ? e.preventDefault()
    : null
);
window.addEventListener("contextmenu", e => e.preventDefault());
