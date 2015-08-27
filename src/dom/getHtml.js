import { getElement } from '../core';

export function getHtml (element) {
  element = getElement(element);

  return element && element.innerHTML;
}
