import {
  textRenderer,
  textRenderedFinal,
  choice,
  element,
  fadeIn,
  fadeOut,
  show,
  hide,
} from "./textrenderer.mjs";

const textboxText = element("textboxText");
const overlay = element("overlay");
const textbox = element("textbox");
const textboxArrow = element("textboxArrow");
const pressEnter = element("press-enter");
let tutorialStart, letsStartPromise, intervalRenderedFinal;

//document.getElementById("game").style.display = "none"

document.addEventListener("keydown", hideStart);

function hideStart(e) {
  if (e.key === "Enter") {
    document.removeEventListener("keydown", hideStart);

    pressEnter.classList.remove("press-enter");
    pressEnter.classList.add("pressed-enter");
    overlay.classList.add("overlay");

    overlay.addEventListener("animationend", showStart);
  }
}

function showStart() {
  overlay.removeEventListener("animationend", showStart);

  hide(element("logo"));
  document.body.classList.remove("container");
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

  hide(element("press-enter"));
  hide(overlay);
  overlay.classList.remove("overlay");
  overlay.style = "";

  let introPromise = new Promise((resolve, reject) => {
    textRenderer("intro", "textboxText");

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
    textRenderer("tutorial", "textboxText");

    setInterval(() => {
      if (textRenderedFinal === true) {
        resolve();
      }
    }, 50);
  });

  tutorialPromise.then(() => {
    show(textboxArrow);

    window.addEventListener("keyup", readyStart);
    window.addEventListener("click", readyStart);
  });
}

function readyStart() {
  if (event.key === "Enter" || event.key === " " || event.type === "click") {
    window.removeEventListener("keyup", readyStart);
    window.removeEventListener("click", readyStart);

    hide(textboxArrow);
    tutorialStart = true;

    readyGame();
  }
}

function readyGame() {
  letsStartPromise = new Promise((resolve, reject) => {
    if (tutorialStart) {
      resolve();
    } else {
      textRenderer("letsStart", "textboxText");

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
      show(textboxArrow);

      window.addEventListener("keyup", readyStart);
      window.addEventListener("click", readyStart);
    }
  });
}

function showGame() {
  textbox.removeEventListener("animationend", showGame);

  fadeOut(textbox);
  document.body.style.boxShadow = "inset 0 0 0 10000px black";

  textbox.addEventListener("transitionend", () => {
    textboxText.innerHTML = "";
    textbox.style.top = "60%";
    document.body.style.transition = "box-shadow 2s";

    setTimeout(() => {
      document.body.style.boxShadow = "inset 0 0 0 10000px transparent";
      fadeIn(textbox);
      document.body.style.backgroundImage =
        "url(/src/img/start_background.webp)";
    }, 300);
  });
}
