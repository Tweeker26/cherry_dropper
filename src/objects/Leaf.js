import getDistanceBetweenTwoPoints from './../helpers/getDistanceBetweenTwoPoints';

import leafImgAsset1 from './../../assets/images/leaf1_copy.png';
import leafImgAsset2 from './../../assets/images/leaf2.png';

export default class Leaf {
  constructor(ctx, canvasEl, width, height, x, y) {
    this.ctx = ctx;
    this.canvasEl = canvasEl;
    this.leafImg = new Image();
    this.leafImg.src = [leafImgAsset1, leafImgAsset2][Math.floor(Math.random() * Math.floor(2))];
    this.width = width;
    this.height = height;
    this.y = y;
    this.x = x;
    this.speed = 0.3;
    this.isFailed = false;
  }

  draw() {
    this.ctx.drawImage(this.leafImg, this.x, this.y, this.width, this.height);
  }

  update(leafs) {
    if (!this.isFailed) {
      this.y += this.speed;
      this.speed += 0.3;
    }

    if (this.y + this.height >= this.canvasEl.height) {
      this.isFailed = true;
    } else {
      for (let i = 0; i < leafs.length; i++) {
        if (leafs[i] === this) continue;
  
        const distance = getDistanceBetweenTwoPoints(this.x, this.y, leafs[i].x, leafs[i].y);

        if (distance <= (this.height / 2) && leafs[i].isFailed) {
          this.isFailed = true;
        }
      }
    }

    this.draw();
  }
}