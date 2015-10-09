import { getElement } from '../core';

export function closest (element, selector, level) {
  if (level && typeof level.value != 'undefined') ++level.value;

  element = getElement(element);

  return (!(element instanceof HTMLElement)
    ? null
    : (typeof selector == 'string' && element.matches(selector) || element == selector
      ? element
      : closest(element.parentNode, selector, level)));
}
