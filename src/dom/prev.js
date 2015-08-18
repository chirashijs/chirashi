import { get } from '../core';

export function prev (element) {
  if (typeof element == 'string') element = get(element);

  return element && element.previousElementSibling;
}
