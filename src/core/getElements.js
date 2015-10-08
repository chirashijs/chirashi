import { isDomElement } from './isDomElement';
import { getSelectorAll } from './getSelectorAll';

export function getElements (elements) {
    if (typeof elements == 'string') return getSelectorAll(elements);

    if (elements instanceof Array || elements instanceof NodeList) return elements;

    return isDomElement(elements) ? [elements] : null;
}
