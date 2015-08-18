import get from '../core/get';

export function parent (element, selector) {
  if (typeof element == 'string') element = get(element);

  return element && element.parentNode;
}
