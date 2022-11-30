import { userSet, enemySet } from "./class/newpokemon.mjs";
import { gameSprite } from "./class/newGameSprite.mjs";

function scaleGameWindow(scale) {
  document.getElementById("game").style.scale = scale <= 0 ? 1 : scale;
  //document.getElementById("canvasBorder").style.scale = scale;
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.height = 192;
canvas.width = 256;

let battleRequestAnim, pokespinRequestAnim;

let battleSheetReady = false;
let pokespinSheetReady = false;
let pokeImageReady = false;
let userBattlePadReady = false;
let enemyBattlePadReady = false;

setInterval(() => {
  let scale;

  if (Math.floor(window.innerWidth - (window.innerWidth % 256) - 128) > 1024) {
    scale = 4;
  } else {
    scale = Math.floor(
      (window.innerWidth - (window.innerWidth % 256) - 128) / 256
    );
  }
  scaleGameWindow(scale);
}, 100);

export function drawBattleSprite(spriteElement, player) {
  let destX, destY, x, y;
  let pokeImage = new Image();
  pokeImage.src = `/src/img/spritesheets/full/${spriteElement.id}.png`;
  if (player === "user") {
    destX = 24;
    destY = 72;
    x = 163;
    y = 34;
  } else if (player === "enemy") {
    destX = 152;
    destY = 22;
    x = 1;
    y = 34;
  }

  pokeImage.onload = () => {
    pokeImageReady = true;
    //ctx.drawImage(pokeImage, x, y, 80, 80, destX, destY, 80, 80);
  };
}

const userBattlePad = new Image();
userBattlePad.src = "/src/img/t2.png";
const enemyBattlePad = new Image();
enemyBattlePad.src = "/src/img/t3.png";

userBattlePad.onload = () => {
  userBattlePadReady = true;
  //ctx.drawImage(userBattlePad, 0, 122);
};

enemyBattlePad.onload = () => {
  enemyBattlePadReady = true;
  //ctx.drawImage(enemyBattlePad, 129, 72);
};

const canvas2 = document.getElementById("gameCanvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.height = 192;
canvas2.width = 256;

ctx2.fillStyle = "#212121";


const textbox = new Image();
textbox.src = "/src/img/textboxSmall.png";



export function drawTextbox() {
    ctx2.fillRect(0, 144, 256, 48);
    ctx2.drawImage(textbox, 2, 145);
}

const battleIntroSheet = new Image();
battleIntroSheet.src = "/src/img/spritesheets/battle-start-anim.png";

let battleIntro = new gameSprite({
  TpF: 2,
  framesHzt: 8,
  framesVtl: 8,
  width: 2048,
  height: 1536,
  img: battleIntroSheet,
  isLooped: false,
  destWidth: 256,
  destHeight: 192,
});

battleIntroSheet.onload = () => {
  battleSheetReady = true;
};

function battleIntroAnim() {
  battleRequestAnim = undefined;
  ctx.clearRect(0, 0, 256, 192);
  if (battleSheetReady) {
    battleIntro.updateC();
    battleIntro.renderC(0, 0);
  }
  battleIntroAnimStart();
}

export function battleIntroAnimStart() {
  if (!battleRequestAnim) {
    battleRequestAnim = window.requestAnimationFrame(battleIntroAnim);
  }
}

export function battleIntroAnimStop() {
  if (battleRequestAnim) {
    window.cancelAnimationFrame(battleRequestAnim);
    battleRequestAnim = undefined;
  }
}

const pokespinSheet = new Image();
pokespinSheet.src = "/src/img/spritesheets/pokespin.png";

let pokespin = new gameSprite({
  TpF: 5,
  framesHzt: 5,
  framesVtl: 4,
  width: 1280,
  height: 768,
  img: pokespinSheet,
  isLooped: false,
  destWidth: 256,
  destHeight: 192,
});

pokespinSheet.onload = () => {
  pokespinSheetReady = true;
};

function pokespinAnim() {
  pokespinRequestAnim = undefined;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (pokespinSheetReady) {
    pokespin.updateC();
    pokespin.renderC(0, 0);
  }
  pokespinAnimStart();
}

export function pokespinAnimStart() {
  if (!pokespinRequestAnim) {
    pokespinRequestAnim = window.requestAnimationFrame(pokespinAnim);
  }
}

export function pokespinAnimStop() {
  if (pokespinRequestAnim) {
    window.cancelAnimationFrame(pokespinRequestAnim);
    pokespinRequestAnim = undefined;
  }
}

function updateBattlePads() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (userBattlePadReady) {
    ctx.drawImage(userBattlePad, 0, 122);
  }
  if (enemyBattlePadReady) {
    ctx.drawImage(enemyBattlePad, 129, 72);
  }

  animateBattlePads();
}

export function animateBattlePads() {
  requestAnimationFrame(updateBattlePads);
}

/* function trim(c) {
  var ctx = c.getContext("2d"),
    copy = document.createElement("canvas").getContext("2d"),
    pixels = ctx.getImageData(0, 0, c.width, c.height),
    l = pixels.data.length,
    i,
    bound = {
      top: null,
      left: null,
      right: null,
      bottom: null,
    },
    x,
    y;

  for (i = 0; i < l; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      x = (i / 4) % c.width;
      y = ~~(i / 4 / c.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  var trimHeight = bound.bottom - bound.top,
    trimWidth = bound.right - bound.left,
    trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  // open new window with trimmed image:
  return copy.canvas;
}

trim(document.getElementById("gameCanvas")); */
