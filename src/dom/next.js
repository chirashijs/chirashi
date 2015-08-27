import { getElement } from '../core';

export function next (element) {
  element = getElement(element);
  if (!element) return;

  return element.nextElementSibling;
}
