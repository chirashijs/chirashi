import { forEach } from '../core';

export function off (elements, events, callback) {
  events = events.split(' ');

  forEach(elements, (element) => {
    if (!element.removeEventListener) return;

    let i = events.length
    while(i--) element.removeEventListener(events[i], callback);
  });
}
