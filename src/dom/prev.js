import { getElement } from '../core';

export function prev (element) {
  element = getElement(element);

  return element && element.previousElementSibling;
}
