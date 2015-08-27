import { getElement } from '../core';

export function getHeight (element) {
  element = getElement(element);
  
  return element && element.offsetHeight;
}
