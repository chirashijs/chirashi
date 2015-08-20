import { getSelector } from '../core';

export function find (element, selector) {
  if (typeof element == 'string') element = getSelector(element);

  return element && [].slice.call(element.querySelectorAll(selector));
}
