import { getSelector } from '../core';

export function clone (element) {
  if (typeof element == 'string') element = getSelector(element);

  return element && element.cloneNode(true);
}
