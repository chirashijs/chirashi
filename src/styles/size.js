import setSize from './setSize';
import getSize from './getSize';

export function size (elements, width, height) {
  if (typeof width != 'undefined' && typeof height != 'undefined') {
    setSize(elements, width, height);
  }
  else {
    return getSize(elements);
  }
}
