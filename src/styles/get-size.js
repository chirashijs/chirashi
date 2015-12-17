import getElement from '../core/get-element';
import getWidth from './get-width';
import getHeight from './get-height';

export function getSize (element) {
  element = getElement(element);

  return element && {
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

export default getSize;
