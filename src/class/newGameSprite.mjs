const canvas = document.getElementById("gameCanvas"),
  ctx = canvas.getContext("2d");
ctx.font = "3em pokeFont";
(canvas.width = 256), (canvas.height = 192);

import { battleIntroAnimStop } from "../gameCanvas.mjs";

export class gameSprite {
  constructor({
    TpF = 0,
    framesHzt,
    framesVtl,
    width,
    height,
    img,
    isLooped,
    destWidth = width / framesHzt,
    destHeight = height / framesVtl,
  }) {
    this.frameIHzt = 0;
    this.frameIVtl = 0;
    this.tick = 0;
    this.TpF = TpF;
    this.framesHzt = framesHzt;
    this.framesVtl = framesVtl;
    this.width = width;
    this.height = height;
    this.img = img;
    this.isLooped = isLooped;
    this.destWidth = destWidth;
    this.destHeight = destHeight;
  }

  renderC(x, y) {
    ctx.drawImage(
      this.img,
      this.frameIHzt * (this.width / this.framesHzt),
      this.frameIVtl * (this.height / this.framesVtl),
      this.width / this.framesHzt,
      this.height / this.framesVtl,
      x,
      y,
      this.destWidth,
      this.destHeight
    );
  }

  updateC() {
    this.tick++;
    if (this.tick <= this.TpF) return;
    this.tick = 0;

    console.log(this);
    if (this.frameIHzt < this.framesHzt - 1) {
      this.frameIHzt++;
    } else {
      this.frameIHzt = 0;
      this.frameIVtl++;
    }
  
  }
}
