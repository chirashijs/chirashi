import { forEach } from './forEach';
import { getElements } from './getElements';

export function forElements (elements, callback, forceOrder = false) {
  forEach(getElements(elements), callback, forceOrder);
}
