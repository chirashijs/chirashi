import { forEach } from './forEach';
import { getElements } from './getElements';

export function forElements (elements, callback) {
  forEach(elements, (elements) => {
    elements = getElements(elements);

    if (!elements) return;

    if (!elements.length) {
      callback(elements)
    }
    else {
      let i = elements.length;
      while (i--) callback(elements[i]);
    }
  });
}
