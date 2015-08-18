import { get } from '../core';

export function getAttr (element, name) {
  if (typeof element == 'string') element = get(element);

  return element && element.getAttribute && element.getAttribute(name);
}
