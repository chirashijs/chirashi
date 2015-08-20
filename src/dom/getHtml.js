import { getSelector } from '../core';

export function getHtml (element) {
  if (typeof element == 'string') element = getSelector(element);

  return element && element.innerHTML;
}
