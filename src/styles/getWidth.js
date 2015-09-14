import { getElement } from '../core';

export function getWidth (element) {
  element = getElement(element);

  return element && element.offsetWidth;
}
