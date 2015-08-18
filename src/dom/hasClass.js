import { get } from '../core';

export function hasClass (element, classes) {
  if (typeof element == 'string') element = get(element);
  if (!element || !element.classList) return;

  classes = classes.split(' ');

  let i = classes.length, found = false;
  while(i-- && (found = element.classList.contains(classes[i]))) {}

  return found;
}
