import { getElement } from '../core';

export function findOne (element, selector) {
  element = getElement(element);

  return element && element.querySelector(selector);
}
