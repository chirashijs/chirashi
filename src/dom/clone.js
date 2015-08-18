import get from '../core/get';

export function clone (element) {
  if (typeof element == 'string') element = get(element);

  return element && element.cloneNode(true);
}
