import getElement from '../core/getElement'

/**
 * Get the value for the property name on the element.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} name - The name of the property
 * @return {string} innerHTML - The inner html of the element
 */
export default function getProp (element, name) {
    element = getElement(element)

    return !!element && element[name]
}
