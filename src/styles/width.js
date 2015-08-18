import setWidth from './setWidth';
import getWidth from './getWidth';

export function width (elements, width) {
  if (typeof width != 'undefined') {
    setWidth(elements, width);
  }
  else {
    return getWidth(elements);
  }
}
