import setAttr from './set-attr';
import getAttr from './get-attr';

export function attr (elements, option) {
  if (typeof option == 'object') {
    setAttr(elements, option);
  }
  else {
    return getAttr(elements, option);
  }
}

export default attr;
