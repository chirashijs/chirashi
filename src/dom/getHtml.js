import { get } from '../core';

export function getHtml (element) {
  if (typeof element == 'string') element = get(element);

  return element && element.innerHTML;
}
