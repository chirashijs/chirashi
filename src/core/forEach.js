import { getAll } from './getAll';

export function forEach (elements, callback) {
  if (typeof elements == 'string') elements = getAll(elements);

  if (!elements) return;

  if (elements instanceof HTMLElement || elements === window || elements === document) {
    callback(elements);
  }
  else {
    let i = elements.length;
    while(i--) callback(elements[i]);
  }
}
