import setProp from './set-prop'
import getProp from './get-prop'

/**
 * Get property option from element if option is a string,
 * set properties from option keys to option values on elements
 * if option is an object.
 * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
 * @return {string | Array | HTMLElement | window | document | SVGElement} value or elements - Value for option property or elements for chaining
 */
export default function prop (elements, option) {
    if (typeof option == 'object')
        return setProp(elements, option)
    else
        return getProp(elements, option)
}
