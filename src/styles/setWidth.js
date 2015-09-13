import { forElements } from '../core';

export function setWidth (elements, width) {
  if (typeof width == 'number') width += 'px';

  forElements(elements, (element) => {
    if (!element.style) return;
    
    element.style.width = width;
  });
}
