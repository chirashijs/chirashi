import getElement from '../core/get-element';

export function findOne (element, selector) {
  element = getElement(element);

  return element && element.querySelector(selector);
}

export default findOne;
