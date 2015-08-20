import { getSelector } from '../core';

export function offset (element) {
  if (typeof element == 'string') element = getSelector(element);
  if (!element) return;

  let rect = element.getBoundingClientRect()

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}
