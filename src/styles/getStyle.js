import { getSelector } from '../core';

export function getStyle (element, property) {
  if (typeof element == 'string') element = getSelector(element);
  if (!element) return;

  let ret = getComputedStyle(element)[property];

  return (ret.indexOf('px') == -1) ? ret : parseInt(ret, 10);
}
