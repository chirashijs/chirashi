import { forElements } from '../core';
import { off } from './off';

export function unhover (elements, enter, leave) {
  forElements(elements, (element) => {
    if (enter) off(element, 'mouseenter', enter);
    if (leave) off(element, 'mouseleave', leave);
  });
}
