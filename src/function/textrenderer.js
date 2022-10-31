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
  textRendered = false;

  document.addEventListener("keyup", skipText);

  function skipText() {
    if (event.key === "Enter") {
      destination.innerHTML = displayText;
      textRendered = true;
      document.removeEventListener("keyup", skipText);
    }
  }

  setInterval(() => {
    if (text.length > 0 && !textRendered) {
      let a = text.shift();
      if (a === "+") {
        destination.innerHTML += "<br>";
      } else {
        destination.innerHTML += a;
      }
    }
  }, speed);

  setTimeout(() => {
    textRendered = true;
    document.removeEventListener("keyup", skipText);
    if (type === "multi") {
      document.getElementById("textboxarrow").style.visibility = "visible";
      document.addEventListener("keyup", nextText);
    }
  }, speed * text.length);

  function nextText() {
    if (event.key === "Enter") {
      document.removeEventListener("keyup", nextText);
      document.getElementById("textboxarrow").style.visibility = "hidden";
      console.log (texti);
      console.log (dialogues[textGroup].line.length);
      if (texti < dialogues.intro.line.length - 1) {
        destination.innerHTML = "";
        textRenderer(textGroup, destinationId, texti + 1);
      }
    }
  }
}

window.textRenderer = textRenderer;
