import { getSelector } from '../core';

export function position (element) {
  if (typeof element == 'string') element = getSelector(element);

  return element && {
    top: element.offsetTop,
    left: element.offsetLeft
  };
}
