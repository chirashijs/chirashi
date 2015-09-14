import { forElements } from '../core';
import { createElement } from './createElement';

export function insertBefore (elements, node) {
  if (typeof node == 'string') node = createElement(node);

  forElements(elements, (element) => {
    if (!element.parentNode) return;

    element.parentNode.insertBefore(node, element);
  });
}
