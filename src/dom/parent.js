import getElement from '../core/get-element'

/**
 * Get the parent node of the element.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element
 * @return {HTMLElement | SVGElement} element - The parent node
 */
export default function parent (element) {
    element = getElement(element)

    return !!element && element.parentNode
}
