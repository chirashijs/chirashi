import { on } from './on';

export function scroll (callback) {
  on(window, 'mousewheel DOMMouseScroll', (event) => {
    let deltaY;

    if (typeof event.deltaY !== 'undefined') {
      deltaY = -event.deltaY;
    }
    else if (typeof event.delta !== 'undefined') {
      deltaY = event.delta;
    }
    else if (typeof event.detail !== 'undefined') {
      deltaY = -event.detail;
    }

    callback({
      top: deltaY
    }, {
      top: window.pageYOffset || document.documentElement.scrollTop,
      left: window.pageXOffset || document.documentElement.scrollLeft
    });
  });
}
