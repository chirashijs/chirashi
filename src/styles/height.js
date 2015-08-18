import setHeight from './setHeight';
import getHeight from './getHeight';

export function height (elements, height) {
  if (typeof height != 'undefined') {
    setHeight(elements, height);
  }
  else {
    return getHeight(elements);
  }
}
