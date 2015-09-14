import { isDomElement } from './isDomElement';
import { getSelectorAll } from './getSelectorAll';

export function getElements (elements) {
    if (!elements) return null;

    if (isDomElement(elements)) return elements;

    if (typeof elements == 'string') return getSelectorAll(elements);

    if (elements.length) return elements;

    return null;
}
