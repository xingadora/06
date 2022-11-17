const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.font = "3em pokeFont";
canvas.width = 256;
canvas.height = 192;

export class Sprite {
  constructor(options) {
    this.frameIHzt = 0;
    this.frameIVtl = 0;
    this.tick = 0;
    this.TpF = options.TpF || 0;
    this.framesHzt = options.framesHzt || 1;
    this.framesVtl = options.framesVtl || 1;
    this.width = options.width;
    this.height = options.height;
    this.img = options.img;
    this.isLooped = options.isLooped;
    this.destWidth = options.destWidth || this.width / this.framesHzt;
    this.destHeight = options.destHeight || this.height / this.framesVtl;
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
    if (this.tick > this.TpF) {
      this.tick = 0;
      if (this.frameIVtl < this.framesVtl - 1) {
        this.frameIVtl++;
      } else if (this.isLooped) {
        this.frameIVtl = 0;
      }
    }
  }
}
