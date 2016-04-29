import forElements   from '../core/for-elements'
import isDomElement  from '../core/is-dom-element'
import createElement from './create-element'

/**
 * Append node to each element of elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string | HTMLElement | SVGElement} node - Dom element or html string or tag to create it
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function append (elements, node) {
    if (typeof node == 'string') node = createElement(node)
    else if (!isDomElement(node)) return elements

    return forElements(elements, element => {
        if (!element.appendChild) return

        element.appendChild(node)
    })
}
