import { get } from '../core';

export function next (element) {
  if (typeof element == 'string') element = get(element);
  if (!element) return;

  return element.nextElementSibling;
}
