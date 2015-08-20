import { getSelector } from '../core';

export function getProp (element, name) {
  if (typeof element == 'string') element = getSelector(element);

  return element && element[name];
}
