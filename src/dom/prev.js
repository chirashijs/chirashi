import getElement from '../core/get-element';

export function prev (element) {
  element = getElement(element);

  return element && element.previousElementSibling;
}

export default prev;
