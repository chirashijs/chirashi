import isDomElement from './is-dom-element'
import getSelector  from './get-selector'

/**
 * Get Dom Element from iterable or selector.
 * @param {string | Array | HTMLElement | window | document | SVGElement} element - The iterable or selector
 * @return {HTMLElement | window | document | SVGElement} domElement - The dom element from element
 */
export default function getElement (element) {
    if (typeof element == 'string') return getSelector(element)

    if (element instanceof Array) return getElement(element[0])

    return isDomElement(element) ? element : null
}
