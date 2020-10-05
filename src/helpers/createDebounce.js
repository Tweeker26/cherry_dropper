export default (timer) => {
  let readyToUse = true;

  setInterval(() => readyToUse = true, timer);

  return (callBack) => {
    if (readyToUse) {
      callBack();

      readyToUse = false;
    }
  };
};