import canvasInit from './helpers/canvasInit'
import createDebounce from './helpers/createDebounce'
import Cherry from './objects/Cherry';
import Leaf from './objects/Leaf';
import getRandomInt from './helpers/getRandomInt';

import './../assets/styles/main.scss';

const [canvasEl, ctx] = canvasInit();
const cherries = [];

const size = 90;

let DAMPING = 0.7;
let SPEED = 1;

const debounceForCherries = createDebounce(1e2);
const debounceForResize = createDebounce(5e2);

window.addEventListener('resize', () => debounceForResize(() => {
  canvasInit();
}));

window.addEventListener('scroll', () => debounceForCherries(() => {
    let xPos = getRandomInt(0, canvasEl.width - size);
    let yPos = getRandomInt(size * (-10), size * (-7));

    cherries.push(
      new Leaf(ctx, canvasEl, size, size, xPos, yPos)
      // new Cherry(ctx, canvasEl, size, size, xPos, yPos)
    );

    // leafs.push(
    //   new Leaf(ctx, canvasEl, size, size, xPos, yPos)
    // );
}));

window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const resolve_collisions = function(ip) {

  let i = cherries.length;

  while (i--) {

    const ball_1 = cherries[i];

    let n = cherries.length;

    while (n--) {

      if (n === i) continue;

      let ball_2 = cherries[n];

      let diff_x = ball_1.x - ball_2.x;
      let diff_y = ball_1.y - ball_2.y;

      let length    = diff_x * diff_x + diff_y * diff_y;
      let dist      = Math.sqrt(length);
      let real_dist = dist - (ball_1.radius + ball_2.radius);

      if (real_dist < 0) {

        let vel_x1 = ball_1.x - ball_1.px;
        let vel_y1 = ball_1.y - ball_1.py;
        let vel_x2 = ball_2.x - ball_2.px;
        let vel_y2 = ball_2.y - ball_2.py;

        let depth_x = diff_x * (real_dist / dist);
        let depth_y = diff_y * (real_dist / dist);

        ball_1.x -= depth_x * 0.5;
        ball_1.y -= depth_y * 0.5;

        ball_2.x += depth_x * 0.5;
        ball_2.y += depth_y * 0.5;

        if (ip) {

          let pr1 = DAMPING * (diff_x*vel_x1+diff_y*vel_y1) / length,
            pr2 = DAMPING * (diff_x*vel_x2+diff_y*vel_y2) / length;

          vel_x1 += pr2 * diff_x - pr1 * diff_x;
          vel_x2 += pr1 * diff_x - pr2 * diff_x;

          vel_y1 += pr2 * diff_y - pr1 * diff_y;
          vel_y2 += pr1 * diff_y - pr2 * diff_y;

          ball_1.px = ball_1.x - vel_x1;
          ball_1.py = ball_1.y - vel_y1;

          ball_2.px = ball_2.x - vel_x2;
          ball_2.py = ball_2.y - vel_y2;
        }
      }
    }
  }
};

const check_walls = function() {

  let i = cherries.length;

  while (i--) {

    let ball = cherries[i];

    if (ball.x < ball.radius) {

      let vel_x = ball.px - ball.x;
      ball.x = ball.radius;
      ball.px = ball.x - vel_x * DAMPING;

    } else if (ball.x + ball.radius > canvasEl.width) {

      let vel_x = ball.px - ball.x;
      ball.x = canvasEl.width - ball.radius;
      ball.px = ball.x - vel_x * DAMPING;
    }

    if (ball.y < ball.radius) {

      let vel_y = ball.py - ball.y;
      ball.y = ball.radius;
      ball.py = ball.y - vel_y * DAMPING;

    } else if (ball.y + ball.radius > canvasEl.height) {

      let vel_y = ball.py - ball.y;
      ball.y = canvasEl.height - ball.radius;
      ball.py = ball.y - vel_y * DAMPING;
    }
  }
};

const animation = () => {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  let iter = 3;

  const delta = SPEED / iter;

  while (iter--) {

    let it = cherries.length;

    while (it--) {
      cherries[it].apply_force(delta);
      cherries[it].verlet();
    }

    resolve_collisions();
    check_walls();

    let i = cherries.length;
    while (i--) cherries[i].verlet();

    resolve_collisions(1);
    check_walls();
  }

  let i = cherries.length;
  while (i--) cherries[i].draw(ctx);

  requestAnimFrame(animation);
};

animation();