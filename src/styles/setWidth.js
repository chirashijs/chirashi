import { forEach } from '../core';

export function setWidth (elements, width) {
  if (typeof width == 'number') width += 'px';

  forEach(elements, (element) => {
    if (!element.style) return;
    
    element.style.width = width;
  });
}
