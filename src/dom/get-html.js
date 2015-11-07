import getElement from '../core/get-element';

export function getHtml (element) {
  element = getElement(element);

  return element && element.innerHTML;
}

export default getHtml;
