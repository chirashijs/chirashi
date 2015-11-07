import forEach from './for-each';
import { getElements } from './getElements';

export function forElements (elements, callback) {
  forEach(getElements(elements), callback);
}

export default forElements;
