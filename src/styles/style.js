import setStyle from './set-style';
import getStyle from './get-style';

export function style (elements, option) {
  if (typeof option == 'object') {
    setStyle(elements, option);
  }
  else if (typeof option == 'string') {
    return getStyle(elements, option);
  }
}

export default style;
