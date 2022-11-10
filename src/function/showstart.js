import { textRenderer, textRenderedFinal, choice } from "./textrenderer.js";
let typedText = document.getElementById("typedtext");
let overlay = document.getElementById("overlay");
let textbox = document.getElementById("textbox");
let textboxArrow = document.getElementById("textboxarrow");
let tutorialStart, letsStartPromise, intervalRenderedFinal;

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
  overlay.classList.remove("overlay");
  overlay.style = "";
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
      readyGame();
    }
  );
}

function showTutorial() {
  let tutorialPromise = new Promise((resolve, reject) => {
    textRenderer("tutorial", "typedtext");
    setInterval(() => {
      if (textRenderedFinal === true) {
        resolve();
      }
    }, 50);
  });

  tutorialPromise.then(() => {
    textboxArrow.style.visibility = "visible";
    window.addEventListener("keyup", readyStart);
    window.addEventListener("click", readyStart);
  });
}

function readyStart() {
  if (event.key === "Enter" || event.key === " " || event.type === "click") {
    window.removeEventListener("keyup", readyStart);
    window.removeEventListener("click", readyStart);
    textboxArrow.style.visibility = "hidden";
    tutorialStart = true;
    readyGame();
  }
}

function readyGame() {
  letsStartPromise = new Promise((resolve, reject) => {
    if (tutorialStart) {
      resolve();
    } else {
      textRenderer("letsStart", "typedtext");
      intervalRenderedFinal = setInterval(() => {
        if (textRenderedFinal === true) {
          resolve();
        }
      }, 50);
    }
  });

  letsStartPromise.then(() => {
    clearInterval(intervalRenderedFinal);
    if (tutorialStart) {
      showGame();
    } else {
      textboxArrow.style.visibility = "visible";
      window.addEventListener("keyup", readyStart);
      window.addEventListener("click", readyStart);
    }
  });
}

function showGame() {
  textbox.removeEventListener("animationend", showGame);
  textbox.style.transition = "opacity 1s";
  textbox.style.opacity = "0";
  document.body.style.boxShadow = "inset 0 0 0 10000px black";
  textbox.addEventListener("transitionend", () => {
    document.getElementById("typedtext").innerHTML = "";
    textbox.style.top = "60%";
    document.body.style.transition = "box-shadow 2s";
    setTimeout(() => {
      document.body.style.boxShadow = "inset 0 0 0 10000px transparent";
      textbox.style.opacity = "1";
      document.body.style.backgroundImage =
        "url(/src/img/start_background.webp)";
    }, 300);
  });
}
