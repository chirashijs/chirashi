import { forElements } from '../core';

export function toggleClass (elements, classes) {
  classes = classes.split(' ');

  forElements(elements, (element) => {
    if (!element.classList) return;

    let i = classes.length;
    while(i--) element.classList.toggle(classes[i]);
  });
}
