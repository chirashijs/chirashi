import forEach       from '../core/forEach'
import forElements   from '../core/forElements'
import isDomElement  from '../core/isDomElement'
import createElement from './createElement'

/**
 * Append node to each element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string | Array | NodeList | HTMLCollection} nodes - Array of DOM elements or html strings or tags to create it
 * @param {Array} [attributes=[]] - The array of attributes' object ( only used with node creation and length should match elements one )
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function append (elements, nodes, attributes=[]) {
    let parsedNodes = []
    forEach(nodes, (node, index) => {
        if (typeof node == 'string') node = createElement(node, attributes[index] || {})

        if (isDomElement(node))
            parsedNodes.push(node)
    })

    return forElements(elements, (element, index) => {
        if (!element.appendChild) return

        forEach(parsedNodes, node => {
            element.appendChild(node)
        })
    })
}
