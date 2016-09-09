import setHtml from './setHtml'
import getHtml from './getHtml'

/**
 * Set inner html of elements if string is provided, get it otherwise.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} [string] - The content to inject in the elements
 * @return {string | Array | HTMLElement | window | document | SVGElement} innerHTML or elements - The inner html of the elements or elements for chaining
 */
export default function html (elements, string) {
    return typeof string == 'string'
         ? setHtml(elements, string)
         : getHtml(elements)
}
