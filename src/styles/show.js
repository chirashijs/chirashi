import { forEach } from '../core';

export function show (elements) {
  forEach(elements, (element) => {
    if (!element.style) return;

    element.style.display = '';
  });
}
