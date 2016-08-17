import setWidth from './set-width'
import getWidth from './get-width'

/**
 * Get width in pixels of element or first element of elements if width is undefined,
 * else set width to all element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {number} [width] - The width
 * @return {number | string | Array | NodeList | HTMLCollection} width | elements - The width in pixels | elements for chaining
 */
export default function width (elements, width) {
    return typeof width != 'undefined'
         ? setWidth(elements, width)
         : getWidth(elements)
}
