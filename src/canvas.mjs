import { userSet, enemySet } from "./class/newpokemon.mjs";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "3em pokeFont";
canvas.width = parseInt(getComputedStyle(canvas).width);
canvas.height = parseInt(getComputedStyle(canvas).height);
canvas.style.backgroundImage = "url(/src/img/pokemon-selection-background.png)";
canvas.style.backgroundSize = "cover";

let x = 0;

const frameWidth = 32;
const frameHeight = 32;
const scaledFrameWidth = frameWidth * 2;
const scaledFrameHeight = frameHeight * 2;

function animate(image, canvasX, canvasY) {
  function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(
      image,
      frameX * frameWidth,
      frameY * frameHeight,
      frameWidth,
      frameHeight,
      canvasX,
      canvasY,
      scaledFrameWidth,
      scaledFrameHeight
    );
  }

  window.requestAnimationFrame(step);

  const frames = [0, 1];
  let currentFrame = 0;
  let frameCount = 0;

  function step() {
    frameCount++;
    if (frameCount < 20) {
      window.requestAnimationFrame(step);
      return;
    }
    frameCount = 0;
    ctx.clearRect(canvasX, canvasY, scaledFrameWidth, scaledFrameHeight);
    ctx.imageSmoothingEnabled = false;
    drawFrame(0, frames[currentFrame], canvasX, canvasY);
    currentFrame++;

    if (currentFrame >= frames.length) {
      currentFrame = 0;
    }

    window.requestAnimationFrame(step);
    x += 32;
  }
}

userSet.forEach((element) => {
  let image = new Image();
  image.src = `/src/img/icons/${element.id}.png`;

  image.onload = animate(image, x, 0);
  x += 64;
});
