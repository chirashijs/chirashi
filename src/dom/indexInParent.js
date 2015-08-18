import get from '../core/get';

export function indexInParent (element) {
  if (typeof element == 'string') element = get(element);
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
