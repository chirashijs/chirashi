import getElement from '../core/get-element';

export function getHeight (element) {
  element = getElement(element);

  return element && element.offsetHeight;
}

export default getHeight;
