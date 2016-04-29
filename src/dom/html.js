import setHtml from './set-html'
import getHtml from './get-html'

/**
 * Set inner html of elements if string is provided, get it otherwise.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} [string] - The content to inject in the elements
 * @return {string | Array | HTMLElement | window | document | SVGElement} innerHTML or elements - The inner html of the elements or elements for chaining
 */
export default function html (elements, string) {
    if (typeof string == 'string')
        return setHtml(elements, string)
    else
        return getHtml(elements)
}
