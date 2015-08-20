import { getSelector } from '../core';

export function prev (element) {
  if (typeof element == 'string') element = getSelector(element);

  return element && element.previousElementSibling;
}
