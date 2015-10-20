import { forElements } from '../core';

export function hide (elements) {
  forElements(elements, (element) => {
    if (!element.style) return;

    element.style.visibility = 'hidden';
  });
}
