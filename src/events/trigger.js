import forEach from '../core/forEach';

export function trigger (elements, event, data) {
  forEach(elements, (element) => {
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
