import { forElements } from '../core';

export function setHtml (elements, string) {
  forElements(elements, (element) => {
    element.innerHTML = string;
  });
}
