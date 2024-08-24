export const throttle = (callback, delay) => {
  let timeoutId = null;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, delay);
  };
};
