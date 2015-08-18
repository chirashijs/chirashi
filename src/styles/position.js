import get from '../core/get';

export function position (element) {
  if (typeof element == 'string') element = get(element);

  return element && {
    top: element.offsetTop,
    left: element.offsetLeft
  };
}
