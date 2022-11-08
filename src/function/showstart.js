import { textRenderer, textRenderedFinal, choice } from "./textrenderer.js";

function showNext() {
  nextId = document.querySelectorAll(".hidden");
  nextId[0].style.display = "block";
  nextId[0].classList.remove("hidden");
}

function showInvalid() {
  invalidId = document.querySelectorAll(".invalid");
  invalidId[0].style.display = "block";
}

function hideInvalid() {
  invalidId = document.querySelectorAll(".invalid");
  invalidId[0].style.display = "none";
}

document.addEventListener("keydown", hideStart);
let overlay = document.getElementById("overlay");
let texti = 0;

function hideStart() {
  let pressEnter = document.getElementById("press-enter");
  if (event.key === "Enter") {
    document.removeEventListener("keydown", hideStart);
    pressEnter.classList.remove("press-enter");
    pressEnter.classList.add("pressed-enter");
    overlay.classList.add("overlay");
    overlay.addEventListener("animationend", showStart);
  }
}

function showStart() {
  let textbox = document.getElementById("textbox");
  overlay.removeEventListener("animationend", showStart);
  document.body.classList.remove("container");
  document.getElementById("logo").style.display = "none";
  document.body.style.backgroundColor = "black";
  document.body.style.backgroundImage = "url()";
  overlay.classList.remove("overlay");
  void overlay.offsetWidth;
  overlay.classList.add("overlay");
  overlay.style.animationDirection = "reverse";
  overlay.style.animationFillMode = "none";
  textbox.classList.add("textbox");
  textbox.style.top = "45%";
  overlay.addEventListener("animationend", finishStart);
}

function finishStart() {
  overlay.removeEventListener("animationend", finishStart);
  overlay.style.display = "none";
  document.getElementById("press-enter").style.display = "none";
  let introPromise = new Promise((resolve, reject) => {
    textRenderer("intro", "typedtext");
    setInterval(() => {
      if (textRenderedFinal === true) {
        if (choice === "yes") {
          resolve();
        } else if (choice === "no") {
          reject();
        }
      }
    }, 50);
  });

  introPromise.then(
    function (value) {
      showTutorial();
    },
    function (error) {
      startGame();
    }
  );
}

function showTutorial() {
  let tutorialPromise = new Promise((resolve, reject) => {
    textRenderer("tutorial", "typedtext");
    let typedText = document.getElementById("typedtext");
    typedText.addEventListener("keyup", skipTutorial);
    setInterval(() => {
      if (textRenderedFinal === true) {
        resolve();
      }
    }, 50);
  });

  function skipTutorial() {
    if (event.key === "Escape") {
      
    }
  }

  tutorialPromise.then(() => {
    startGame();
  });
}

function startGame() {}
