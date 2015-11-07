import setSize from './setSize';
import getSize from './getSize';

export function size (elements, object) {
  if (typeof object != 'object') {
    return getSize(elements);
  }
  else {
    setSize(elements, object);
  }
}

export default size;
