import getElement from '../core/getElement'

/**
 * Get height in pixels of element.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @return {number} height - The height in pixels
 */
export default function getHeight (element) {
    element = getElement(element)

    return !!element && element.offsetHeight
}
