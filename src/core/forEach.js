import { getSelectorAll } from './getSelectorAll';
import { getElement } from './getElement';
import { isDomElement } from './isDomElement';

export function forEach (elements, callback) {
  if (!elements) return;

  if (typeof elements == 'string' || !elements.length) {
    callback(elements);
  }
  else {
    let i = elements.length;
    while(i--) callback(elements[i]);
  }
}
