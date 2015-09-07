import { forEach } from '../core';
import { createElement } from './createElement';

export function insertBefore (elements, node) {
  if (typeof node == 'string') node = createElement(node);

  forEach(elements, (element) => {
    if (!element.parentNode) return;

    element.parentNode.insertBefore(node, element);
  });
}
