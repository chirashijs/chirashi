import * as Core from './core';

export function on (elements, events, callback) {
  events = events.split(' ');

  Core.forEach(elements, (element) => {
    if (!element.addEventListener) return;

    for (let event of events)
      element.addEventListener(event, callback);
  });
}

export function off (elements, events, callback) {
  events = events.split(' ');

  Core.forEach(elements, (element) => {
    if (!element.removeEventListener) return;

    for (let event of events)
      element.removeEventListener(event, callback);
  });
}

export function ready (callback) {
  document.addEventListener('DOMContentLoaded', callback);
}

export function load (elements, eachCallback, allCallback) {
  if (typeof elements == 'string') elements = Core.getAll(elements);

  let n = {
    value: elements.length
  };

  let callback = (event) => {
    let element = event.currentTarget;

    off(element, 'load loadedmetadata', callback);

    if (eachCallback) eachCallback.apply(element);

    if (!(--n.value)) allCallback();
  };

  Core.forEach(elements, (element) => {
    if (element.naturalWidth || element.loadedmetadata) {
      callback(element);
    }
    else {
      on(element, 'load loadedmetadata', callback.bind(element));
    }
  });
}

export function hover (elements, enter, leave) {
  Core.forEach(elements, (element) => {
    on(element, 'mouseenter', enter);
    on(element, 'mouseleave', leave);
  });
}

export function trigger (elements, event, data) {
  Core.forEach(elements, (element) => {
    if (!element.dispatchEvent) return;

    if (window.CustomEvent) {
      event = new CustomEvent(event, {detail: data});
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(event, true, true, data);
    }

    element.dispatchEvent(event);
  });
}

export function scroll (callback) {
  on(window, 'scroll', (event) => {
    callback({
      top: window.pageYOffset || document.documentElement.scrollTop,
      left: window.pageXOffset || document.documentElement.scrollLeft
    });
  });
}

export function resize (callback) {
  on(window, 'resize', () => {
    callback({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });
}
