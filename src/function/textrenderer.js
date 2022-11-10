import dialogues from "../data/dialogue.json" assert { type: "json" };
export { textRenderedFinal, choice };

let textRenderedFinal = false;
let textRendered = false;
let choice = false;

export function textRenderer(textGroup, destinationId, textIndex) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = "3em pokeFont";
  let destination = document.getElementById(destinationId);
  let buttonY = document.getElementById("clickboxY");
  let buttonN = document.getElementById("clickboxN");
  let selectorY = document.getElementById("clickbox-selectorY");
  let selectorN = document.getElementById("clickbox-selectorN");
  let textbox = document.getElementById("textbox");
  let typedText = document.getElementById("typedtext");
  let type = dialogues[textGroup].type;
  let texti = textIndex || 0;
  let displayText = dialogues[textGroup].line[texti];
  let textWidth = ctx.measureText(displayText).width;
  let textBoxWidth = textbox.offsetWidth - typedText.offsetLeft - parseInt(window.getComputedStyle(typedText).marginRight)
  let text = Array.from(displayText);
  let speed = 20;
  let skipped = false;
  choice = false;
  textRendered = false;
  textRenderedFinal = false;

  document.addEventListener("keyup", skipText);
  document.addEventListener("click", skipText);

  function skipText() {
    if (event.key === "Enter" || event.key === " " || event.type === "click") {
      destination.innerHTML = displayText;
      destination.scrollTo(0, 100);
      textRendered = true;
      skipped = true;
      document.removeEventListener("keyup", skipText);
      document.removeEventListener("click", skipText);
    }
  }

  const intervalID = setInterval(() => {
    if (text.length > 0 && !textRendered && !skipped) {
      let a = text.shift();
      if (a === "+") {
        destination.innerHTML += "<br>";
      } else {
        destination.innerHTML += a;
      }
    } else {
      clearInterval(intervalID);
      destination.innerHTML = displayText;
      textRendered = true;
      document.removeEventListener("keyup", skipText);
      document.removeEventListener("click", skipText);
      if (type === "multi" || type === "choice") {
        if (texti < dialogues[textGroup].line.length - 1) {
          document.getElementById("textboxarrow").style.visibility = "visible";
          document.addEventListener("keyup", nextText);
          document.addEventListener("click", nextText);
        } else {
          textRenderedFinal = true;
          document.getElementById("textboxarrow").style.visibility = "hidden";
          if (type === "choice") {
            buttonY.style.animation = "fadein 1s forwards";
            buttonN.style.animation = "fadein 1s forwards";
            buttonY.addEventListener("click", yesChoice);
            buttonN.addEventListener("click", noChoice);
          }
        }
      }
    }
  }, speed);

  function yesChoice() {
    selectorY.style.display = "block";
    selectorN.style.display = "none";
    selectorY.style.animation = "selector 0.4s step-start 0s infinite";
    buttonY.removeEventListener("click", yesChoice);
    buttonN.removeEventListener("click", noChoice);
    buttonY.style.animation = "fadeout 0.5s forwards";
    buttonN.style.animation = "fadeout 0.5s forwards";
    buttonY.style.animationDelay = "0.6s";
    buttonN.style.animationDelay = "0.6s";
    buttonY.style.opacity = "1";
    buttonN.style.opacity = "1";
    buttonY.addEventListener("animationend", removeButtons);
    setTimeout(() => {
      choice = "yes";
      destination.innerHTML = "";
    }, 600);
  }

  function noChoice() {
    selectorN.style.display = "block";
    selectorY.style.display = "none";
    selectorN.style.animation = "selector 0.4s step-start 0s infinite";
    buttonY.removeEventListener("click", yesChoice);
    buttonN.removeEventListener("click", noChoice);
    buttonY.style.animation = "fadeout 0.5s forwards";
    buttonN.style.animation = "fadeout 0.5s forwards";
    buttonY.style.animationDelay = "0.6s";
    buttonN.style.animationDelay = "0.6s";
    buttonY.style.opacity = "1";
    buttonN.style.opacity = "1";
    buttonN.addEventListener("animationend", removeButtons);
    setTimeout(() => {
      choice = "no";
      destination.innerHTML = "";
    }, 600);
  }

  function removeButtons() {
    buttonY.style.visibility = "hidden";
    buttonN.style.visibility = "hidden";
  }

  function nextText() {
    if (event.key === "Enter" || event.key === " " || event.type === "click") {
      document.removeEventListener("keyup", nextText);
      document.removeEventListener("click", nextText);
      document.getElementById("textboxarrow").style.visibility = "hidden";
      if (texti < dialogues[textGroup].line.length - 1) {
        destination.innerHTML = "";
        textRenderer(textGroup, destinationId, texti + 1);
      } else {
        textRendered = true;
        destination.innerHTML = "";
      }
    }
  }
}

window.textRenderer = textRenderer;


setInterval(() => {
  if (!textRendered) {
    document.getElementById("typedtext").scrollTo(0, 100);
  }
}, 20);