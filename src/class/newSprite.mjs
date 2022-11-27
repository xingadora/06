const canvas = document.getElementById("selectionCanvas"),
  ctx = canvas.getContext("2d");
ctx.font = "3em pokeFont";
canvas.width = 256,
  canvas.height = 192;

export class Sprite {
  constructor({
    TpF = 0,
    framesHzt = 1,
    framesVtl = 1,
    width,
    height,
    img,
    isLooped,
    destWidth = width / framesHzt,
    destHeight = height / framesVtl
  }) {
    this.frameIHzt = this.frameIVtl = this.tick = 0;
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
    if (this.frameIVtl < this.framesVtl - 1) return void this.frameIVtl++;
    this.isLooped && (this.frameIVtl = 0);
  }
}