import getElement from '../core/get-element';

export function find (element, selector) {
  element = getElement(element);

  return !element ? [] : [].slice.call(element.querySelectorAll(selector));
}

export default find;
