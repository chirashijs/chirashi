import forEach from '../core/forEach';

export function remove (elements) {
  forEach(elements, (element) => {
    if (!element.parentNode) return;

    element.parentNode.removeChild(element);
  });
}
