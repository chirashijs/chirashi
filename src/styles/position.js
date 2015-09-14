import { getElement } from '../core';

export function position (element) {
  element = getElement(element);

  return element && {
    top: element.offsetTop,
    left: element.offsetLeft
  };
}
