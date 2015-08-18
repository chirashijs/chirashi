import { forEach } from '../core';

export function off (elements, events, callback) {
  events = events.split(' ');

  forEach(elements, (element) => {
    if (!element.removeEventListener) return;

    for (let event of events)
      element.removeEventListener(event, callback);
  });
}
