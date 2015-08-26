import { forEach } from '../core';
import { on } from './on';

export function hover (elements, enter, leave) {
  forEach(elements, (element) => {
    if (enter) on(element, 'mouseenter', enter);
    if (leave) on(element, 'mouseleave', leave);
  });
}
