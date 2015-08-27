import { getElement } from '../core';

export function getAttr (element, name) {
  element = getElement(element);

  return element && element.getAttribute && element.getAttribute(name);
}
