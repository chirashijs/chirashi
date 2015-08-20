import { getSelector } from '../core';

export function next (element) {
  if (typeof element == 'string') element = getSelector(element);
  if (!element) return;

  return element.nextElementSibling;
}
