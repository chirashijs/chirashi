import getElement from '../core/get-element'

/**
 * Find the first element's child matching the selector.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} selector - The selector
 * @return {HTMLElement | SVGElement} element - The first child of element matching the selector
 */
export default function findOne (element, selector) {
    element = getElement(element)

    return element && element.querySelector(selector)
}
