import getElement from '../core/get-element';

export function offset (element) {
  element = getElement(element);
  if (!element) return;

  let rect = element.getBoundingClientRect()

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
}

export default offset;
