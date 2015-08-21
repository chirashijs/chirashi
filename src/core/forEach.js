import { getSelectorAll } from './getSelectorAll';
import { isDomElement } from './isDomElement';

export function forEach (elements, callback) {
  if (typeof elements == 'string') elements = getSelectorAll(elements);

  if (!elements) return;

  if (isDomElement(elements)) {
    callback(elements);
  }
  else {
    let i = elements.length;
    while(i--)
      if (isDomElement(element))
        callback(elements[i]);
  }
}
