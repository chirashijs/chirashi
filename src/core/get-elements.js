import forEach from './for-each';
import isDomElement from './is-dom-element';
import getSelectorAll from './get-selector-all';

export function getElements (elements) {
    if (typeof elements == 'string') return getSelectorAll(elements);

    if (elements instanceof Array) {
      let parsedElements = [];
      forEach(elements, (element) => {
        let newElements = getElements(element);
        if (newElements) parsedElements = parsedElements.concat(newElements);
      });

      return parsedElements;
    }

    if (elements instanceof NodeList) return [].slice.call(elements);

    return isDomElement(elements) ? [elements] : null;
}

export default getElements;
