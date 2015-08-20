import { getSelector } from '../core';

export function indexInParent (element) {
  if (typeof element == 'string') element = getSelector(element);
  if (!element) return;

  let currentElement = element,
      parent = element.parentNode,
      i = 0;

  while (currentElement.previousElementSibling) {
      ++i;
      currentElement = currentElement.previousElementSibling;
  }

  return element === parent.children[i] ? i : -1;
}
