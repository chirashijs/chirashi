import { forEach } from '../core';

export function hide (elements) {
  forEach(elements, (element) => {
    if (!element.style) return;

    element.style.display = 'none';
  });
}
