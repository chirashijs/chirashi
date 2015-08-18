import forEach from '../core/forEach';

export function append (elements, node) {
  if (typeof node == 'string') node = createElement(node);

  forEach(elements, (element) => {
    if (!element.appendChild) return;

    element.appendChild(node);
  });
}
