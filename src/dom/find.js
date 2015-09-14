import { getElement } from '../core';

export function find (element, selector) {
  element = getElement(element);

  return element && [].slice.call(element.querySelectorAll(selector));
}
