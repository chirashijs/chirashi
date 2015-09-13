import { forElements } from '../core';

export function removeAttr (elements, name) {
  forElements(elements, (element) => {
    if (!element.removeAttribute) return;

    element.removeAttribute(name);
  });
}
