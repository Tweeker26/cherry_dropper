import cherryImgAsset from './../../assets/images/cherry-svgrepo-com.svg';

export default class Cherry {
  constructor(ctx, canvasEl, width, height) {
    this.ctx = ctx;
    this.cherryImg = new Image();
    this.cherryImg.src = cherryImgAsset;
    this.width = width;
    this.height = height;
    this.y = height * (-1);
    this.x = Math.round(Math.random() * canvasEl.width);
  }

  draw() {
    this.ctx.drawImage(this.cherryImg, this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += 0.5;

    this.draw();
  }
}