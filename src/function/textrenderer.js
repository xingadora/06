import dialogues from "../data/dialogue.json" assert { type: "json" };
export { textRendered };

let textRendered = false;

export function textRenderer(textGroup, destinationId, textIndex) {
  let destination = document.getElementById(destinationId);
  let type = dialogues[textGroup].type;
  let texti = textIndex || 0;
  let displayText = dialogues[textGroup].line[texti];
  let text = Array.from(displayText);
  let speed = 20;
  let skipped = false;
  textRendered = false;

  document.addEventListener("keyup", skipText);
  document.addEventListener("click", skipText);

  function skipText() {
    if (event.key === "Enter" || event.key === " " || event.type === "click") {
      destination.innerHTML = displayText;
      textRendered = true;
      skipped = true;
      document.removeEventListener("keyup", skipText);
      document.removeEventListener("click", skipText);
    }
  }

  setInterval(() => {
    if (text.length > 0 && !textRendered && !skipped) {
      let a = text.shift();
      if (a === "+") {
        destination.innerHTML += "<br>";
      } else {
        destination.innerHTML += a;
      }
    }
  }, speed);

  setTimeout(() => {
    destination.innerHTML = displayText;
    textRendered = true;
    document.removeEventListener("keyup", skipText);
    document.removeEventListener("click", skipText);
    if (type === "multi") {
      if (texti < dialogues[textGroup].line.length - 1) {
        document.getElementById("textboxarrow").style.visibility = "visible";
        document.addEventListener("keyup", nextText);
        document.addEventListener("click", nextText);
      } else {
        document.getElementById("textboxarrow").style.visibility = "hidden";
      }
    }
  }, speed * text.length);

  function nextText() {
    if (event.key === "Enter" || event.key === " " || event.type === "click") {
      document.removeEventListener("keyup", nextText);
      document.removeEventListener("click", nextText);
      document.getElementById("textboxarrow").style.visibility = "hidden";
      if (texti < dialogues.intro.line.length - 1) {
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
