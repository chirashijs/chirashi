import forEach from '../core/forEach';

export function hide (elements) {
  forEach(elements, (element) => {
    if (!element.style) return;

    element.style.display = 'none';
  });
}
