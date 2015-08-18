import { get } from '../core';

export function position (element) {
  if (typeof element == 'string') element = get(element);

  return element && {
    top: element.offsetTop,
    left: element.offsetLeft
  };
}
