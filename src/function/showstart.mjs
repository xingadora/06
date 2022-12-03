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

import {
  drawBattleSprite,
  battleIntroAnimStart,
  battleIntroAnimStop,
  pokespinAnimStart,
  pokespinAnimStop,
  animateBattlePads,
  drawTextbox,
  animateBackground,
  drawBattleButtons
} from "../gameCanvas.mjs";
import { userSet, enemySet } from "../class/newpokemon.mjs";

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

const selectionReady = element("selectionReady")

const selectionShutterTop = document.getElementById("selectionShutterTop");
const selecitonShutterBottom = document.getElementById(
  "selectionShutterBottom"
);
const gameShutterTop = document.getElementById("gameShutterTop");
const gameShutterBottom = document.getElementById("gameShutterBottom");

function showGame() {
  textbox.removeEventListener("animationend", showGame);

  document.getElementById("buttonY").style.display = "none";
  document.getElementById("buttonN").style.display = "none";
  document.getElementById("selection").style.display = "block";

  fadeOut(textbox);
  document.body.style.boxShadow = "inset 0 0 0 10000px black";

  textbox.addEventListener("transitionend", () => {
    textbox.style.display = "none";
    textboxText.innerHTML = "";
    selectionReady.style.top = "75%";
    document.body.style.transition = "box-shadow 2s";
    fadeIn(document.getElementById("selection"));
    fadeIn(selectionReady);

    setTimeout(() => {
      document.body.style.boxShadow = "inset 0 0 0 10000px transparent";
      document.body.style.backgroundImage =
        "url(/src/img/start_background.webp)";
    }, 300);

    document
      .getElementById("selectionReady")
      .addEventListener("click", afterSelection);
  });
}

function afterSelection() {
  selectionReady.removeEventListener("click", afterSelection);
  selectionReady.style.transition = "opacity 0.5s";
  selectionReady.style.opacity = "0";
  selectionReady.addEventListener("transitionend", () => {
    selectionReady.style.display = "none";
  });
  selectionShutterTop.style.height = "50%";
  selecitonShutterBottom.style.height = "50%";
  gameShutterTop.style.height = "50%";
  gameShutterBottom.style.height = "50%";

  selectionShutterTop.addEventListener("transitionend", () => {
    document.getElementById("selection").style.display = "none";
    document.getElementById("game").style.display = "block";

    setTimeout(() => {
      gameShutterTop.style.height = "0%";
      gameShutterBottom.style.height = "0%";
      document.getElementById("gameCanvas").style.backgroundColor = "black";
      showBattleIntros();
    }, 600);
  });
}

function showBattleIntros() {
  setTimeout(() => {
    pokespinAnimStart();
  }, 50);
  setTimeout(() => {
    pokespinAnimStop();
    document.getElementById("gameCanvas").style.transition = "background-color 0.4s ease-in-out";
    document.getElementById("gameCanvas").style.backgroundColor = "#0086be";
    setTimeout(() => {
      battleIntroAnimStart();
      document.getElementById("gameCanvas").style.backgroundColor = "white";
    }, 400);
    setTimeout(() => {
      document.getElementById("textboxOverlay").style.zIndex = "3";
      document.getElementById("textboxOverlay").style.backgroundColor = "black"
      document.getElementById("textboxOverlay").style.transition = "background-color 0.4s ease-in-out";
    }, 1000);
    setTimeout(() => {
      battleIntroAnimStop();
      document.getElementById("gameCanvas").style.backgroundColor = "transparent";
      //drawBattleSprite(userSet[0], "user");
      //drawBattleSprite(enemySet[0], "enemy");
      animateBattlePads();
      animateBackground();
      drawTextbox();
      drawBattleButtons();
      setTimeout(() => {
        document.getElementById("textboxOverlay").style.backgroundColor = "transparent";
        document.getElementById("textboxOverlay").addEventListener("transitionend", () => {
          document.getElementById("textboxOverlay").style.display = "none";
        })
      }, 500);
    }, 2100);
  }, 1250);
}
