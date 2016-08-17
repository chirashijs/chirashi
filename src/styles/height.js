import setHeight from './set-height'
import getHeight from './get-height'

/**
 * Get height in pixels of element or first element of elements if height is undefined,
 * else set height to all element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {number} [height] - The height
 * @return {number | string | Array | NodeList | HTMLCollection} height | elements - The height in pixels | elements for chaining
 */
export default function height (elements, height) {
    return typeof height != 'undefined'
         ? setHeight(elements, height)
         : getHeight(elements)
}
