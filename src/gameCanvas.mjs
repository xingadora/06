import { userSet, enemySet } from "./class/newpokemon.mjs";
import spriteSheet from "./pokemonSprites.json" assert { type: "json" };

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


export function drawBattleSprite(spriteElement) {
    let pokeImage = new Image();
    pokeImage.src = `/src/img/spritesheets/pokemon/back-regular-male-frame1.png`;
    let id = spriteElement.id;
    let sprite = spriteSheet.back_regular_male_frame1[id]

    let commaIndex = sprite.backgroundPosition.indexOf(", ")
    let x = sprite.backgroundPosition.slice(0, commaIndex);
    let y = sprite.backgroundPosition.slice(commaIndex + 2, sprite.backgroundPosition.length);
    pokeImage.onload = () => {
        ctx.drawImage(pokeImage, x, y, sprite.width, sprite.height, 0, 0, 80, 80);
    }
}
