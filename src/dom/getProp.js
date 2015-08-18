import { get } from '../core';

export function getProp (element, name) {
  if (typeof element == 'string') element = get(element);

  return element && element[name];
}
