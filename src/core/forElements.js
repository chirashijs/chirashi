import { forEach } from './forEach';
import { getElements } from './getElements';

export function forElements (elements, callback) {
  forEach(getElements(elements), callback);
}
