import { isDomElement } from './isDomElement';
import { getSelector } from './getSelector';

export function getElement (element) {
    if (typeof element == 'string') return getSelector(element);

    if (element instanceof Array) return getElement(element[0]);

    return isDomElement(element) ? element : null;
}
