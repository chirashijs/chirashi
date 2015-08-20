import { getSelector } from '../core';

export function screenPosition (element) {
  if (typeof element == 'string') element = getSelector(element);
  if (!element) return;

  let rect = element.getBoundingClientRect()

  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left
  };
}
