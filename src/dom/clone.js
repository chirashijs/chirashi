import getElement from '../core/get-element'

/**
 * Clone element.
 * @param {string | HTMLElement | SVGElement} element - The dom element or selector
 * @return {HTMLElement | SVGElement} clone - The clone of element
 */
export default function clone (element) {
    element = getElement(element)

    return !!element && element.cloneNode(true)
}
