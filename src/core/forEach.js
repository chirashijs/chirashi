import getSelectorAll from './getSelectorAll'
import getElement     from './getElement'
import isDomElement   from './isDomElement'

/**
 * Iterates over elements and apply callback on each one.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable
 * @param {function} callback - The function to call for each iteratee
 * @param {bool} [forceOrder=false] - Respect elements order
 * @return {string | Array | NodeList | HTMLCollection} elements for chaining
 */
export default function forEach (elements, callback, forceOrder = false) {
    if (!elements) return

    if (!(elements instanceof Array || elements instanceof NodeList || elements instanceof HTMLCollection)) {
        callback(elements, 0)
    }
    else {
        if (!forceOrder) {
            let i = elements.length
            while(i--) callback(elements[i], i)
        }
        else {
            let i = -1, len = elements.length
            while(++i < len) {
                callback(elements[i], i)
            }
        }
    }

    return elements
}
