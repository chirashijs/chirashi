import forEach     from './for-each'
import getElements from './get-elements'

/**
 * Iterates over dom elements and apply callback on each one.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {function} callback - The function to call for each iteratee
 * @param {bool} [forceOrder=false] - Respect elements order
 * @return {string | Array | NodeList | HTMLCollection} elements for chaining
 */
export default function forElements (elements, callback, forceOrder = false) {
    return forEach(getElements(elements), callback, forceOrder)
}
