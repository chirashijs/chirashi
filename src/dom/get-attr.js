import getElement from '../core/get-element';

export function getAttr (element, name) {
  element = getElement(element);

  return element && element.getAttribute && element.getAttribute(name);
}

export default getAttr;
