import { getSelectorAll } from './getSelectorAll';

export function forEach (elements, callback) {
  if (typeof elements == 'string') elements = getSelectorAll(elements);

  if (!elements) return;

  if (elements instanceof HTMLElement || elements === window || elements === document) {
    callback(elements);
  }
  else {
    let i = elements.length;
    while(i--) callback(elements[i]);
  }
}
