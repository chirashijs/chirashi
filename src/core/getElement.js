import { getSelector } from './getSelector';

export function getElement (element) {
    return element && (typeof element == 'string' ? getSelector(element) : (element.length ? element[0] : element));
}
