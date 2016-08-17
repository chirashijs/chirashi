import getElement from '../core/get-element'

/**
 * Get value of the name attribute on element.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} name - The attribute's name
 * @return {string} value - The value for the attribute
 */
export default function getAttr (element, name) {
    element = getElement(element)

    return !!element && element.getAttribute && element.getAttribute(name)
}
