import { getAttr } from './get-attr'

/**
 * Get value of the name date attribute on element.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} name - The data attribute's name
 * @return {string} value - The value for the data attribute
 */
export default function getData (element, name) {
    return getAttr(element, 'data-'+name)
}
