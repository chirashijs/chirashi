import get from '../core/get';

export function getHeight (element) {
  if (typeof element == 'string') element = get(element);

  return element && parseInt(getComputedStyle(element).height, 10);
}
