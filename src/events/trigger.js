import { forEach } from '../core';

export function trigger (elements, events, data) {
  events = events.split(' ');
  let i = events.length;

  while(i--) {
    let event = events[i];

    if (window.CustomEvent) {
      event = new CustomEvent(event, {detail: data});
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(event, true, true, data);
    }

    forEach(elements, (element) => {
      if (!element.dispatchEvent) return;

      element.dispatchEvent(event);
    });
  }
}
