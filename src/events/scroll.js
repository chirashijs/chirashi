import on from './on';

export function scroll (userCallback) {
  let callback = (event) => {
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

    userCallback({
      top: deltaY
    }, {
      top: window.pageYOffset || document.documentElement.scrollTop,
      left: window.pageXOffset || document.documentElement.scrollLeft
    });
  };

  on(window, 'scroll mousewheel DOMMouseScroll', callback);

  return callback;
}

export default scroll;
