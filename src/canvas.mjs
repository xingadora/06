import { userSet, enemySet } from "./class/newpokemon.mjs";
import position from "./data/canvasPositions.json" assert { type: "json" };
import { Sprite } from "./class/newSprite.mjs";
import { textRenderer } from "./function/textrenderer.mjs";
import { renderInfo } from "./function/selectionPokemon.mjs";

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
const backRerollImg = new Image();
backRerollImg.src = "/src/img/selection/button-small.png";

const backReroll = new Sprite({
  width: 56,
  height: 24,
  img: backRerollImg,
})

let backRerollReady = false;
backReroll.img.onload = () => {
  backRerollReady = true;
}

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

let pokeIcon = [],
  pokeGender = [],
  hasGender = [];
let i = 0;
userSet.forEach((element) => {
  if (element.gender !== "none") {
    let genderImg = new Image();
    genderImg.src = `/src/img/selection/${element.gender}.png`;

    pokeGender[i] = new Sprite({
      width: 8,
      height: 11,
      img: genderImg,
    });

    pokeGender[i].img.onload = () => {
      pokeGendersReady = true;
    };
  } else {
    hasGender[i] = false;
  }

  let iconImg = new Image();
  iconImg.src = `/src/img/icons/${element.id}.png`;

  pokeIcon[i] = new Sprite({
    width: 32,
    height: 64,
    img: iconImg,
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

let pokeIconsReady, MboxUReady, boxUReady, pokeGendersReady;
pokeIcon[5].img.onload = () => {
  pokeIconsReady = true;
};


renderInfo(0);
renderInfo(1);
renderInfo(2);
renderInfo(3);
renderInfo(4);
renderInfo(5);

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (MboxUReady) {
    ctx.drawImage(MboxU, position.box.unselected.X[0], position.box.unselected.Y[0]);
  }
  if (boxUReady) {
    for (let i = 1; i <= 5; i++) {
      ctx.drawImage(
        boxU,
        position.box.unselected.X[i],
        position.box.unselected.Y[i]
      );
    }
  }
  if (pokeIconsReady) {
    for (let i = 0; i <= pokeIcon.length - 1; i++) {
      pokeIcon[i].updateC();
      pokeIcon[i].renderC(
        position.icon.unselected.X[i],
        position.icon.unselected.Y[i]
      );
    }
  }
  if (pokeGendersReady) {
    for (let i = 0; i <= pokeGender.length - 1; i++) {
      if(hasGender[i]){
        pokeGender[i].renderC(position.gender.X[i], position.gender.Y[i]);
      }
    }
  }
  if (backRerollReady) {
    backReroll.renderC(position.backReroll.X, position.backReroll.Y);
  }
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

/* console.log("screen width: " + window.screen.width);
console.log("screen height: " + window.screen.height); */

function scaleGameWindow(scale) {
  document.getElementById("game").style.scale = scale * 2;
  //document.getElementById("canvasBorder").style.scale = scale;
}

scaleGameWindow(2);

document.getElementById("backReroll").innerHTML = "CANCEL";