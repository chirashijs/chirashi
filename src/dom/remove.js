import forElements from '../core/for-elements'

/**
 * Remove all elements from dom.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @return {string | Array | NodeList | HTMLCollection} elements - The removed elements
 */
export default function remove (elements) {
    return forElements(elements, element => {
        if (!element.parentNode) return

        element.parentNode.removeChild(element)
    })
}
