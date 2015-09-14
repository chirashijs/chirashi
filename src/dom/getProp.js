import { getElement } from '../core';

export function getProp (element, name) {
  element = getElement(element);

  return element && element[name];
}
