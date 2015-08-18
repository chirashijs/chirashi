import on from './on';

export function scroll (callback) {
  on(window, 'scroll', (event) => {
    callback({
      top: window.pageYOffset || document.documentElement.scrollTop,
      left: window.pageXOffset || document.documentElement.scrollLeft
    });
  });
}
