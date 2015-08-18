import { forEach } from '../core';

export function removeClass (elements, classes) {
  classes = classes.split(' ');

  forEach(elements, (element) => {
    if (!element.classList) return;

    let i = classes.length;
    while(i--) element.classList.remove(classes[i]);
  });
}
