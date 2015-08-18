import { get } from '../core';

export function getWidth (element) {
  if (typeof element == 'string') element = get(element);

  return element && parseInt(getComputedStyle(element).width, 10);
}
