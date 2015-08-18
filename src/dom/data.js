import { setData } from './setData';
import { getData } from './getData';

export function data (elements, option) {
  if (typeof option == 'object') {
    setData(elements, option);
  }
  else {
    return getData(elements, option);
  }
}
