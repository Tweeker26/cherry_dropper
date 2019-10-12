export default class Ball {
  constructor(ctx, canvasEl, posX, posY, radius, speed) {
    this.radius = radius;
    this.canvasEl = canvasEl;
    this.posX = posX;
    this.posY = posY;
    this.ctx = ctx;
    this.speed = speed;
  }

  draw() {
    this.ctx.fillStyle = 'red';
    this.ctx.beginPath();
    this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  update() {
    this.posY += this.speed;

    let coefficient = 0.3;

    if (this.posY + this.radius > this.canvasEl.height) {
      this.speed = -this.speed * 0.9;
    } else {
      this.speed += coefficient;
    }

    this.draw();
  }
}