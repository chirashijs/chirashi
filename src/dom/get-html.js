import getElement from '../core/get-element'

/**
 * Get the inner html of the element.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element
 * @return {string} innerHTML - The inner html of the element
 */
export default function getHtml (element) {
    element = getElement(element)

    return !!element && element.innerHTML
}
