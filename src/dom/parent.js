import { get } from '../core';

export function parent (element, selector) {
  if (typeof element == 'string') element = get(element);

  return element && element.parentNode;
}
