import { getSelector } from '../core';

export function getHeight (element) {
  if (typeof element == 'string') element = getSelector(element);

  return element && element.offsetHeight;
}
