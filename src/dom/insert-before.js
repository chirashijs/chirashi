import forElements from '../core/for-elements'
import createElement from './create-element'

/**
 * Insert node to each element's parent of elements after element.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string | HTMLElement | SVGElement} node - Dom element or html string or tag to create it
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function insertBefore (elements, node) {
    if (typeof node == 'string') node = createElement(node)

    return forElements(elements, element => {
        if (!element.parentNode) return

        element.parentNode.insertBefore(node, element)
    })
}
