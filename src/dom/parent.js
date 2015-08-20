import { getSelector } from '../core';

export function parent (element, selector) {
  if (typeof element == 'string') element = getSelector(element);

  return element && element.parentNode;
}
