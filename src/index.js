import canvasInit from './helpers/canvasInit'
import createDebounce from './helpers/createDebounce'
import Cherry from './objects/Cherry';

import './../assets/styles/main.scss';

const [canvasEl, ctx] = canvasInit();
const cherries = [];
const debounce = createDebounce(1e3);

window.addEventListener('scroll', () => debounce(() => {
  cherries.push(
    new Cherry(ctx, canvasEl, 50, 50)
  );
}));

const animation = () => {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  
  for (let cherry of cherries) {
    if (cherry.y < (canvasEl.height - cherry.height)) {
      cherry.update();
    } else {
      cherry.draw();
    }
  }

  requestAnimationFrame(animation);
};

animation();