import { forEach } from '../core';

export function removeAttr (elements, name) {
  forEach(elements, (element) => {
    if (!element.removeAttribute) return;

    element.removeAttribute(name);
  });
}
