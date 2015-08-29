import { forEach } from '../core';

export function setHeight (elements, height) {
  if (typeof height == 'number') height += 'px';

  forEach(elements, (element) => {
    if (!element.style) return;
    
    element.style.height = height;
  });
}
