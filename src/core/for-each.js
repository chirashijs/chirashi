import getSelectorAll from './get-selector-all';
import getElement from './get-element';
import isDomElement from './is-dom-element';

export function forEach (elements, callback, forceOrder = false) {
  if (!elements) return;

  if (!(elements instanceof Array || elements instanceof NodeList)) {
    callback(elements, 0);
  }
  else {
    if (!forceOrder) {
        let i = elements.length;
        while(i--) callback(elements[i], i);
    }
    else {
        let i = -1;
        while(++i < elements.length) callback(elements[i], i);
    }
  }
}

export default forEach;
