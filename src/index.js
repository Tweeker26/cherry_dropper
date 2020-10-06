import canvasInit from './helpers/canvasInit'
import createDebounce from './helpers/createDebounce'
import Cherry from './objects/Cherry';
import getDistanceBetweenTwoPoints from './helpers/getDistanceBetweenTwoPoints';
import getRandomInt from './helpers/getRandomInt';

import './../assets/styles/main.scss';

const [canvasEl, ctx] = canvasInit();
const cherries = {
  large: [],
  medium: [],
  small: []
};
const sizes = {
  large: 100,
  medium: 90,
  small: 80
}
const debounce = createDebounce(1e2);

window.addEventListener('scroll', () => debounce(() => {
  for (let size in cherries) {
    let xPos = getRandomInt(0, canvasEl.width - sizes[size]);
    let yPos = getRandomInt(sizes[size] * (-3), sizes[size] * (-1));
  
    if (!cherries[size].length) {
      cherries[size].push(
        new Cherry(ctx, canvasEl, sizes[size], sizes[size], xPos, yPos)
      );
    } else {
      for (let i = 0; i < cherries[size].length; i++) {
        if (getDistanceBetweenTwoPoints(xPos, yPos, cherries[size][i].x, cherries[size][i].y) - sizes[size] < 0) {
          xPos = getRandomInt(0, canvasEl.width - sizes[size]);
          yPos = getRandomInt(sizes[size] * (-3), sizes[size] * (-1));
  
          i = -1;
          continue;
        }
      }
    
      cherries[size].push(
        new Cherry(ctx, canvasEl, sizes[size], sizes[size], xPos, yPos)
      );
    }
  }
}));

const animation = () => {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  
  for (let size in cherries) {
    for (let cherry of cherries[size]) {
      cherry.update(cherries[size]);
    }
  }

  requestAnimationFrame(animation);
};

animation();