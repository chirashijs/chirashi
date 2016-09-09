import setSize from './setSize'
import getSize from './getSize'

/**
 * Get size in pixels of element or first element of elements if size is undefined,
 * else set size to all element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {object} [size] - The size as an object with width and height
 * @return {object | string | Array | NodeList | HTMLCollection} size | elements - The size as an object with width and height in pixels | elements for chaining
 */
export default function size (elements, size) {
    if (typeof size != 'object')
        return getSize(elements)
    else
        return setSize(elements, size)
}
