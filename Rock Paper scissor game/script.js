let userScore = 0;
let compScore = 0;

let scissors = document.querySelector(".scissors");
let paper = document.querySelector(".paper");
let rock = document.querySelector(".rock");

let userPara = document.querySelector(".userScore-para");
let compPara = document.querySelector(".compScore-para");

let cmnBtn = document.querySelectorAll(".cmnBtn");
let msg = document.querySelector(".result");
let newGame = document.querySelector(".newGameBtn");

function genrateCompChoice() {
  let choices = ["rock", "paper", "scissors"];
  let random = Math.floor(Math.random() * 3);

  return choices[random];
}

function showWinner(userWin, userChoice, compChoice) {
  if (userWin === null) {
    msg.innerText = `This is a draw try again! No one wins between ${userChoice} and ${compChoice}`;
    msg.style.backgroundColor = "rgb(20, 138, 159)";
  } else if (userWin) {
    userScore++;
    userPara.innerText = userScore;
    msg.innerText = `Congratulations You Win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compPara.innerText = compScore;

    msg.innerText = `Sorry You Lose Try again! ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
}

function playGame(userChoice) {
  const compChoice = genrateCompChoice();

  let userWin;

  if (userChoice === compChoice) {
    userWin = null;
  } else {
    userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else if (userChoice === "scissors") {
      userWin = compChoice === "rock" ? false : true;
    }
  }

  showWinner(userWin, userChoice, compChoice);
}

cmnBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const userChoice = btn.getAttribute("id");
    playGame(userChoice);
  });
});

function restart() {
  userScore = 0;
  compScore = 0;

  userPara.innerText = userScore;
  compPara.innerText = compScore;

  msg.innerText = "Play Your move";
}

newGame.addEventListener("click", () => {
  restart();
});
