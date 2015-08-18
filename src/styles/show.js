import forEach from '../core/forEach';

export function show (elements) {
  forEach(elements, (element) => {
    if (!element.style) return;

    element.style.display = '';
  });
}
