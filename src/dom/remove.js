import { forElements } from '../core';

export function remove (elements) {
  forElements(elements, (element) => {
    if (!element.parentNode) return;

    element.parentNode.removeChild(element);
  });
}
