import getElement from '../core/get-element'

/**
 * Find the element's children matching the selector.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} selector - The selector
 * @return {Array} elements - The children of element matching the selector
 */
export default function find (element, selector) {
    element = getElement(element)

    return !element ? [] : [].slice.call(element.querySelectorAll(selector))
}
