import getElement from '../core/getElement'

/**
 * Get the previous sibling of element.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element
 * @return {HTMLElement | SVGElement} element - The previous element
 */
export default function prev (element) {
    element = getElement(element)

    return !!element && element.previousElementSibling
}
