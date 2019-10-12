import canvasInit from './helpers/canvasInit'
import Ball from './objects/Ball';

import './../assets/styles/main.scss';

const [canvasEl, ctx] = canvasInit();
const xPos = canvasEl.width / 2 - 25;
const yPos = 150;
const ball = new Ball(ctx, canvasEl, xPos, yPos, 50, 3);

const animation = () => {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  ball.update();

  requestAnimationFrame(animation);
};

animation();