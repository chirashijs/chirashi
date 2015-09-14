import setProp from './setProp';
import getProp from './getProp';

export function prop (elements, option) {
  if (typeof option == 'object') {
    setProp(elements, option);
  }
  else {
    return getProp(elements, option);
  }
}
