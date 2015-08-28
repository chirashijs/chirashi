import { getElement } from '../core';

export function screenPosition (element) {
  element = getElement(element);
  if (!element) return;

  let rect = element.getBoundingClientRect()

  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left
  };
}
