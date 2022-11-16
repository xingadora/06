import { userSet, enemySet } from "./class/newpokemon.mjs";
import position from "./data/canvasPositions.json" assert { type: "json" };

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "3em pokeFont";
canvas.width = 256;
canvas.height = 192;
canvas.style.backgroundImage = "url(/src/img/pokemon-selection-background.png)";
canvas.style.backgroundSize = "cover";

const MboxU = new Image(126, 45);
MboxU.src = "/src/img/selection/main-pokemon-box-unselected.png";
const MboxS = new Image(128, 49);
MboxS.src = "/src/img/selection/main-pokemon-box-selected.png";
const boxU = new Image(126, 45);
boxU.src = "/src/img/selection/pokemon-box-unselected.png";
const boxS = new Image(128, 49);
boxS.src = "/src/img/selection/pokemon-box-selected.png";

const frameWidth = 32;
const frameHeight = 32;
let x = 0;
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
      frameWidth,
      frameHeight
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
    ctx.clearRect(canvasX, canvasY, frameWidth, frameHeight);
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
  x += 32;
});


MboxU.onload = () => ctx.drawImage(MboxU, position.box.unselected.X[0], position.box.unselected.Y[0]);

boxU.onload = () => {
  for (let i = 1; i < 6; i++) {
    ctx.drawImage(boxU, position.box.unselected.X[i], position.box.unselected.Y[i]);
  }
};