import getElement from '../core/getElement'

/**
 * Get the next sibling of element.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element
 * @return {HTMLElement | SVGElement} element - The next element
 */
export default function next (element) {
    element = getElement(element)
    if (!element) return

    return element.nextElementSibling
}
