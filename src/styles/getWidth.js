import getElement from '../core/getElement'

/**
 * Get width in pixels of element.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @return {number} width - The width in pixels
 */
export default function getWidth (element) {
    element = getElement(element)

    return !!element && element.offsetWidth
}
