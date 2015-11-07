import getElement from '../core/get-element';

export function getProp (element, name) {
  element = getElement(element);

  return element && element[name];
}

export default getProp;
