import get from '../core/get';

export function getStyle (element, property) {
  if (typeof element == 'string') element = get(element);
  if (!element) return;

  let ret = getComputedStyle(element)[property];

  return (ret.indexOf('px') == -1) ? ret : parseInt(ret, 10);
}
