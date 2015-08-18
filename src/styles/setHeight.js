import { forEach } from '../core';

export function setHeight (elements, height) {
  if (typeof height == 'number') height += 'px';

  forEach(elements, (element) => {
    element.style.height = height;
  });
}
