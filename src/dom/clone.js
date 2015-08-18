import { get } from '../core';

export function clone (element) {
  if (typeof element == 'string') element = get(element);

  return element && element.cloneNode(true);
}
