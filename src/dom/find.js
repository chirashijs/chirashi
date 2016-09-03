import forElements from '../core/for-elements'

/**
 * Find the elements' children matching the selector.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} selector - The selector
 * @return {Array} elements - The elements' children matching the selector
 */
export default function find (elements, selector) {
    let found = []

    forElements(elements, element => {
        found = found.concat([].slice.call(element.querySelectorAll(selector)))
    })

    return found
}
