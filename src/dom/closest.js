import { get } from '../core';

export function closest (element, selector) {
  if (typeof element == 'string') element = get(element);

  return (!(element instanceof HTMLElement)
    ? null
    : (element.matches(selector)
      ? element
      : parent(element.parentNode, selector)));
}
