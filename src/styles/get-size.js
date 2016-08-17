import getElement from '../core/get-element'

/**
 * Get size in pixels of element.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @return {number} size - The size in pixels
 */
 export default function getSize (element) {
    element = getElement(element)

    return !!element && {
        width: element.offsetWidth,
        height: element.offsetHeight
    }
 }
