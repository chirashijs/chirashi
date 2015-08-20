import { forEach } from '../core';

export function on (elements, events, callback) {
  events = events.split(' ');

  forEach(elements, (element) => {
    if (!element.addEventListener) return;

    let i = events.length
    while(i--) element.addEventListener(event, callback);
  });
}
