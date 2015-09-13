import { forElements } from '../core';

export function setSize (elements, width, height) {
  if (typeof width == 'number') width += 'px';
  if (typeof height == 'number') height += 'px';

  forElements(elements, (element) => {
    if (!element.style) return;
    
    element.style.width = width;
    element.style.height = height;
  });
}
