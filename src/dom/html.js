import setHtml from './setHtml';
import getHtml from './getHtml';

export function html (elements, string) {
  if (typeof string == 'string') {
    setHtml(elements, string);
  }
  else {
    return getHtml(elements);
  }
}
