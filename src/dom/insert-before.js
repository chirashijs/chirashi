import forElements from '../core/for-elements';
import createElement from './create-element';

export function insertBefore (elements, node) {
  if (typeof node == 'string') node = createElement(node);

  forElements(elements, (element) => {
    if (!element.parentNode) return;

    element.parentNode.insertBefore(node, element);
  });
}

export default insertBefore;
