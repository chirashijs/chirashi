import { forElements } from '../core';

export function setHeight (elements, height) {
  if (typeof height == 'number') height += 'px';

  forElements(elements, (element) => {
    if (!element.style) return;
    
    element.style.height = height;
  });
}
