import { getElement } from '../core';

export function parent (element, selector) {
  element = getElement(element);

  return element && element.parentNode;
}
