export function textRenderer(displayText, destinationId) {
  let destination = document.getElementById(destinationId);
  let text = Array.from(displayText);

  setInterval(() => {
    if (text.length > 0) {
      let a = text.shift();
      if (a === "+") {
        destination.innerHTML += "<br>";
      } else {
        destination.innerHTML += a;
      }
    }
  }, 20);
}

window.textRenderer = textRenderer;
