import dialogues from "../data/dialogue.json" assert { type: "json" };
export { textRenderedFinal, choice };

window.textRenderer = textRenderer;

let textRenderedFinal = false;
let textRendered = false;
let textSkipped = false;
let choice = false;

const canvas = element("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "3em pokeFont";

export function element(element) {
  return document.getElementById(element);
}

export function fadeIn(element, duration, delay) {
  duration = duration || "1s";
  delay = delay || "0s";
  element.style.transition = `opacity ${duration} ${delay}`;
  element.style.opacity = "1";
}

export function fadeOut(element, duration, delay) {
  duration = duration || "1s";
  delay = delay || "0s";
  element.style.transition = `opacity ${duration} ${delay}`;
  element.style.opacity = "0";
}

export function show(element) {
  element.style.display = "block";
}

export function hide(element) {
  element.style.display = "none";
}

export function textRenderer(textGroup, destinationId, textIndex, speed) {
  speed = speed || 20;
  textIndex = textIndex || 0;
  let type = dialogues[textGroup].type;
  let displayText = dialogues[textGroup].line[textIndex];
  let text = Array.from(displayText);
  let destination = element(destinationId);

  const buttonY = element("buttonY");
  const buttonN = element("buttonN");
  const selectorY = element("selectorY");
  const selectorN = element("selectorN");
  const textbox = element("textbox");
  const textboxText = element("textboxText");
  const textboxArrow = element("textboxArrow");

  choice = false;
  textSkipped = false;
  textRendered = false;
  textRenderedFinal = false;

  function clearText() {
    destination.innerHTML = "";
  }

  let textBoxWidth =
    textbox.offsetWidth -
    textboxText.offsetLeft -
    parseInt(window.getComputedStyle(textboxText).marginRight);

  let checkArray = [];
  let found = false;

  text.forEach((letter) => {
    let testWidth = ctx.measureText(checkArray.join("")).width;
    checkArray.push(letter);

    if (!found && testWidth > textBoxWidth) {
      found = true;
      let replaceAt = checkArray.lastIndexOf(" ");
      text[replaceAt] = "<br>";
    }
  });

  document.addEventListener("keyup", skipText);
  document.addEventListener("click", skipText);

  function skipText(e) {
    if (e.key === "Enter" || e.key === " " || e.type === "click") {
      document.removeEventListener("keyup", skipText);
      document.removeEventListener("click", skipText);

      destination.innerHTML = displayText;
      destination.scrollTo(0, 100);

      textSkipped = textRendered = true;
    }
  }

  const textInterval = setInterval(() => {
    if (text.length > 0 && !textRendered && !textSkipped) {
      let currentLetter = text.shift();
      destination.innerHTML += currentLetter;
    } else {
      document.removeEventListener("keyup", skipText);
      document.removeEventListener("click", skipText);

      clearInterval(textInterval);
      destination.innerHTML = displayText;
      textRendered = true;

      if (type === "multi" || type === "choice") {
        if (textIndex < dialogues[textGroup].line.length - 1) {
          show(textboxArrow);

          document.addEventListener("keyup", nextText);
          document.addEventListener("click", nextText);
        } else {
          textRenderedFinal = true;
          hide(textboxArrow);

          if (type === "choice") {
            fadeIn(buttonY, "1s", "0.2s");
            fadeIn(buttonN, "1s", "0.2s");

            buttonY.addEventListener("click", yesChoice);
            buttonN.addEventListener("click", noChoice);
          }
        }
      }
    }
  }, speed);

  function yesChoice() {
    buttonY.removeEventListener("click", yesChoice);
    buttonN.removeEventListener("click", noChoice);

    show(selectorY);
    hide(selectorN);
    selectorY.style.animation = "selector 0.4s step-start 0s infinite";

    fadeOut(buttonY, "0.5s", "0.6s");
    fadeOut(buttonN, "0.5s", "0.6s");

    buttonY.addEventListener("animationend", removeButtons);

    setTimeout(() => {
      choice = "yes";
      clearText();
    }, 600);
  }

  function noChoice() {
    buttonY.removeEventListener("click", yesChoice);
    buttonN.removeEventListener("click", noChoice);

    show(selectorN);
    hide(selectorY);
    selectorN.style.animation = "selector 0.4s step-start 0s infinite";

    fadeOut(buttonY, "0.5s", "0.6s");
    fadeOut(buttonN, "0.5s", "0.6s");

    buttonN.addEventListener("animationend", removeButtons);

    setTimeout(() => {
      choice = "no";
      clearText();
    }, 600);
  }

  function removeButtons() {
    hide(buttonY);
    hide(buttonN);
  }

  function nextText() {
    if (event.key === "Enter" || event.key === " " || event.type === "click") {
      document.removeEventListener("keyup", nextText);
      document.removeEventListener("click", nextText);

      hide(textboxArrow);

      if (textIndex < dialogues[textGroup].line.length - 1) {
        clearText();
        textRenderer(textGroup, destinationId, textIndex + 1);
      } else {
        textRendered = true;
        clearText();
      }
    }
  }

  setInterval(() => {
    if (!textRendered) {
      textboxText.scrollTo(0, 100);
    }
  }, 20);
}
