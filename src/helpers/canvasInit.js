const canvasInit = () => {
  const canvasEl = document.querySelector('#canvas');
  const ctx = canvasEl.getContext('2d');

  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  return [canvasEl, ctx];
};

export default canvasInit;