import { forEach } from '../core';

export function setHtml (elements, string) {
  forEach(elements, (element) => {
    element.innerHTML = string;
  });
}
