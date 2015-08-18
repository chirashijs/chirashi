import get from '../core/get';

export function prev (element) {
  if (typeof element == 'string') element = get(element);

  return element && element.previousElementSibling;
}
