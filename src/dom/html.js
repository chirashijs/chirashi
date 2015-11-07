import setHtml from './set-html';
import getHtml from './get-html';

export function html (elements, string) {
  if (typeof string == 'string') {
    setHtml(elements, string);
  }
  else {
    return getHtml(elements);
  }
}

export default html;
