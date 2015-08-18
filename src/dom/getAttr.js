import get from '../core/get';

export function getAttr (element, name) {
  if (typeof element == 'string') element = get(element);

  return element && element.getAttribute && element.getAttribute(name);
}
