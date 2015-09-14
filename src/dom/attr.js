import { setAttr } from './setAttr';
import { getAttr } from './getAttr';

export function attr (elements, option) {
  if (typeof option == 'object') {
    setAttr(elements, option);
  }
  else {
    return getAttr(elements, option);
  }
}
