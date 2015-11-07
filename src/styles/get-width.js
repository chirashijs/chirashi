import getElement from '../core/get-element';

export function getWidth (element) {
  element = getElement(element);

  return element && element.offsetWidth;
}

export default getWidth;
