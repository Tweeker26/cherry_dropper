// import getDistanceBetweenTwoPoints from './../helpers/getDistanceBetweenTwoPoints';

import cherryImgAsset1 from './../../assets/images/cherry6_copy.png';
import cherryImgAsset2 from './../../assets/images/cherry4.png';
import cherryImgAsset3 from './../../assets/images/cherry8.png';

let GRAVITY = 0.2;

export default class Cherry {
  constructor(ctx, canvasEl, width, height, x, y) {
    this.ctx = ctx;
    // this.canvasEl = canvasEl;
    this.cherryImg = new Image();
    this.cherryImg.src = [cherryImgAsset1, cherryImgAsset2, cherryImgAsset3][Math.floor(Math.random() * Math.floor(3))];
    this.width = width;
    this.height = height;
    this.y = y;
    this.x = x;
    this.px = x;
    this.py = y;
    this.fx = 0;
    this.fy = 0;
    this.radius = this.height / (2 + Math.random() * 3);
    // this.speed = 0.3;
    // this.isFailed = false;
  }

  draw() {
    this.ctx.drawImage(this.cherryImg, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  apply_force(delta) {
    delta *= delta;

    this.fy += GRAVITY;

    this.x += this.fx * delta;
    this.y += this.fy * delta;

    this.fx = this.fy = 0;
  }

  verlet() {
    const nx = (this.x * 2) - this.px;
    const ny = (this.y * 2) - this.py;

    this.px = this.x;
    this.py = this.y;

    this.x = nx;
    this.y = ny;
  }

  // update(cherries) {
  //   if (!this.isFailed) {
  //     this.y += this.speed;
  //     this.speed += 0.3;
  //   }
  //
  //   if (this.y + this.height >= this.canvasEl.height) {
  //     this.isFailed = true;
  //   } else {
  //     for (let i = 0; i < cherries.length; i++) {
  //       if (cherries[i] === this) continue;
  //
  //       const distance = getDistanceBetweenTwoPoints(this.x, this.y, cherries[i].x, cherries[i].y);
  //
  //       if (distance <= (this.height / 2) && cherries[i].isFailed) {
  //         this.isFailed = true;
  //       }
  //     }
  //   }
  //
  //   this.draw();
  // }
}