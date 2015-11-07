import isDomElement from './is-dom-element';
import getSelector from './get-selector';

export function getElement (element) {
    if (typeof element == 'string') return getSelector(element);

    if (element instanceof Array) return getElement(element[0]);

    return isDomElement(element) ? element : null;
}

export default getElement;
