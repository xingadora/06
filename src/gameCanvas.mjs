import { userSet, enemySet } from "./class/newpokemon.mjs";

function scaleGameWindow(scale) {
    document.getElementById("game").style.scale = scale <= 0 ? 1 : scale;
    //document.getElementById("canvasBorder").style.scale = scale;
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.height = 192;
canvas.width = 256;

setInterval(() => {
    let scale;

    if (Math.floor(((window.innerWidth - window.innerWidth % 256) - 128)) > 1024) {
        scale = 3;
    } else {
        scale = Math.floor(((window.innerWidth - window.innerWidth % 256) - 128) / 256)
    }
    scaleGameWindow(scale);

}, 100);


let pokeImage = new Image();
pokeImage.src = "/src/img/spritesheets/pokemon/back-regular-female-frame1.png";


let spriteElement = userSet[0];

pokeImage.onload = () => {
  ctx.drawImage(pokeImage, 165, 1, 80, 80, 0, 0, 80, 80);
}   