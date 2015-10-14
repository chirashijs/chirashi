import { forEach } from './forEach';
import { isDomElement } from './isDomElement';
import { getSelectorAll } from './getSelectorAll';

export function getElements (elements) {
    if (typeof elements == 'string') return getSelectorAll(elements);

    if (elements instanceof Array) {
      let parsedElements = [];
      forEach(elements, (element) => {
        parsedElements = parsedElements.concat(getElements(element));
      });

      return parsedElements;
    }

    if (elements instanceof NodeList) return [].slice.call(elements);

    return isDomElement(elements) ? [elements] : null;
}
