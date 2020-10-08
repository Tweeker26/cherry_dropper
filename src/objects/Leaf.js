// import getDistanceBetweenTwoPoints from './../helpers/getDistanceBetweenTwoPoints';

import leafImgAsset1 from './../../assets/images/leaf1_copy.png';
import leafImgAsset2 from './../../assets/images/leaf2.png';

let GRAVITY = 0.2;

export default class Leaf {
  constructor(ctx, canvasEl, width, height, x, y) {
    this.ctx = ctx;
    // this.canvasEl = canvasEl;
    this.leafImg = new Image();
    this.leafImg.src = [leafImgAsset1, leafImgAsset2][Math.floor(Math.random() * Math.floor(2))];
    this.width = width;
    this.height = height;
    this.y = y;
    this.x = x;
    this.px = x;
    this.py = y;
    this.fx = 0;
    this.fy = 0;
    this.radius = this.height / 5;
    // this.speed = 0.3;
    // this.isFailed = false;
  }

  draw() {
    this.ctx.drawImage(this.leafImg, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
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

  // update(leafs) {
  //   if (!this.isFailed) {
  //     this.y += this.speed;
  //     this.speed += 0.3;
  //   }
  //
  //   if (this.y + this.height >= this.canvasEl.height) {
  //     this.isFailed = true;
  //   } else {
  //     for (let i = 0; i < leafs.length; i++) {
  //       if (leafs[i] === this) continue;
  //
  //       const distance = getDistanceBetweenTwoPoints(this.x, this.y, leafs[i].x, leafs[i].y);
  //
  //       if (distance <= (this.height / 2) && leafs[i].isFailed) {
  //         this.isFailed = true;
  //       }
  //     }
  //   }
  //
  //   this.draw();
  // }
}