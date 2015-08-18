import get from '../core/get';

export function getProp (element, name) {
  if (typeof element == 'string') element = get(element);

  return element && element[name];
}
