import getSelectorAll from './get-selector-all';
import getElement from './get-element';
import isDomElement from './is-dom-element';

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

export default forEach;
