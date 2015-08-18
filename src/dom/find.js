import get from '../core/get';

export function find (element, selector) {
  if (typeof element == 'string') element = get(element);

  return element && [].slice.call(element.querySelectorAll(selector));
}
