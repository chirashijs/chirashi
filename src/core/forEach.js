import { getSelectorAll } from './getSelectorAll';
import { getElement } from './getElement';
import { isDomElement } from './isDomElement';

export function forEach (elements, callback) {
  if (!elements) return;

  if (!(elements instanceof Array || elements instanceof NodeList)) {
    callback(elements, 0);
  }
  else {
    let i = elements.length;
    while(i--) callback(elements[i], i);
  }
}
