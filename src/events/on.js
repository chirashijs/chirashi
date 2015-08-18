import { forEach } from '../core';

export function on (elements, events, callback) {
  events = events.split(' ');

  forEach(elements, (element) => {
    if (!element.addEventListener) return;

    for (let event of events)
      element.addEventListener(event, callback);
  });
}
