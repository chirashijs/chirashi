import setData from './setData'
import getData from './getData'

/**
 * Get data attribute option from element if option is a string,
 * set data attributes from option keys to option values on elements
 * if option is an object.
 * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
 * @param {string | Object} option - data attribute name or data attribute names and values association
 * @return {string | Array | HTMLElement | window | document | SVGElement} value or elements - Value for option data attribute or elements for chaining
 */
export default function data (elements, option) {
    return typeof option == 'object'
         ? setData(elements, option)
         : getData(elements, option)
}
