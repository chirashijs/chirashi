import getElement from '../core/get-element';

export function hasClass (element, classes) {
  element = getElement(element);
  if (!element || !element.classList) return;

  classes = classes.split(' ');

  let i = classes.length, found = false;
  while(i-- && (found = element.classList.contains(classes[i]))) {}

  return found;
}

export default hasClass;
