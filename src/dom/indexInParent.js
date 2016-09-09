import getElement from '../core/getElement'

/**
 * Get the position of element in his parent's children.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} index - The position of element in his parent's children
 */
export default function indexInParent (element) {
    element = getElement(element)
    if (!element) return

    let currentElement = element,
        parent = element.parentNode,
        i = 0

    while (currentElement.previousElementSibling) {
        ++i
        currentElement = currentElement.previousElementSibling
    }

    return element === parent.children[i] ? i : -1
}
