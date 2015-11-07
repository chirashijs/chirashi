import getElement from '../core/get-element';

export function clone (element) {
  element = getElement(element);

  return element && element.cloneNode(true);
}

export default clone;
