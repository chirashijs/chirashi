import { getElement } from '../core';

export function offset (element) {
  element = getElement(element);
  if (!element) return;

  let rect = element.getBoundingClientRect()

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}
