import getDistanceBetweenTwoPoints from './../helpers/getDistanceBetweenTwoPoints';

import cherryImgAsset from './../../assets/images/cherry4.png';

export default class Cherry {
  constructor(ctx, canvasEl, width, height, x, y) {
    this.ctx = ctx;
    this.canvasEl = canvasEl;
    this.cherryImg = new Image();
    this.cherryImg.src = cherryImgAsset;
    this.width = width;
    this.height = height;
    this.y = y;
    this.x = x;
    this.speed = 0.3;
    this.isFailed = false;
  }

  draw() {
    this.ctx.drawImage(this.cherryImg, this.x, this.y, this.width, this.height);
  }

  update(cherries) {
    if (!this.isFailed) {
      this.y += this.speed;
      this.speed += 0.3;
    }

    if (this.y + this.height >= this.canvasEl.height) {
      this.isFailed = true;
    } else {
      for (let i = 0; i < cherries.length; i++) {
        if (cherries[i] === this) continue;
  
        const distance = getDistanceBetweenTwoPoints(this.x, this.y, cherries[i].x, cherries[i].y);

        if (distance <= this.height && cherries[i].isFailed) {
          this.isFailed = true;
        }
      }
    }

    this.draw();
  }
}