import { getElement } from '../core';
import { getWidth } from './getWidth';
import { getHeight } from './getHeight';

export function getSize (element) {
  element = getElement(element);
 
  return element && {
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}
