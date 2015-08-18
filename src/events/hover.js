import forEach from '../core/forEach';
import on from './on';
import off from './off';

export function hover (elements, enter, leave) {
  forEach(elements, (element) => {
    if (enter) on(element, 'mouseenter', enter);
    if (leave) on(element, 'mouseleave', leave);
  });
}
