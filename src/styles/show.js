import { forElements } from '../core';

export function show (elements) {
  forElements(elements, (element) => {
    if (!element.style) return;

    element.style.visibility = '';
  });
}
