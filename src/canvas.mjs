import { userSet, enemySet } from "./class/newpokemon.mjs";
import position from "./data/canvasPositions.json" assert { type: "json" };
import { Sprite } from "./class/newSprite.mjs";

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

  window.requestAnimationFrame(tick);

  const frames = [0, 1];
  let currentFrame = 0;
  let frameCount = 0;

  function tick() {
    frameCount++;
    if (frameCount < 20) {
      window.requestAnimationFrame(tick);
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

    window.requestAnimationFrame(tick);
    x += 32;
  }
}

let pokeIcon = [];
let i = 0;
userSet.forEach((element) => {
  let elementImg = new Image();
  elementImg.src = `/src/img/icons/${element.id}.png`;

  pokeIcon[i] = new Sprite({
    width: 32,
    height: 64,
    img: elementImg,
    framesHzt: 1,
    framesVtl: 2,
    TpF: 20,
    isLooped: true,
    destWidth: 32,
    destHeight: 32,
  });

  if (i < 5) {
    i++;
  }
  x += 32;
});

let iconsReady, MboxUReady, boxUReady;
pokeIcon[5].img.onload = () => {
  iconsReady = true;
};

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (MboxUReady) {
    ctx.drawImage(MboxU, position.box.unselected.X, position.box.unselected.Y);
  }
  if (boxUReady) {
    for (let i = 0; i <= 5; i++) {
      ctx.drawImage(
        boxU,
        position.box.unselected.X[i],
        position.box.unselected.Y[i]
      );
    }
  }
  if (iconsReady) {
    for (let i = 0; i <= pokeIcon.length - 1; i++) {
      pokeIcon[i].updateC();
      pokeIcon[i].renderC(
        position.icon.unselected.X[i],
        position.icon.unselected.Y[i]
      );
    }
  }
  
  
  
  ctx.font = '1em pokeFont'
  ctx.fillText("Hello", 50, 50);
}

function main() {
  render();
  window.requestAnimationFrame(main);
}

MboxU.onload = () => {
  MboxUReady = true;
};

boxU.onload = () => {
  boxUReady = true;
};

main();
