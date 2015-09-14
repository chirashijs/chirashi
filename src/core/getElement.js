import { isDomElement } from './isDomElement';
import { getSelector } from './getSelector';

export function getElement (element) {

    if (isDomElement(element)) return element;

    if (typeof element == 'string') return getSelector(element);

    if (element.length) return element[0];

    return null;
}
