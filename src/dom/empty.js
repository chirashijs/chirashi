import setHtml from './setHtml'

/**
 * Remove children of provided dom elements.
 * @param {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable, selector or dom element
 * @return {string | Array | HTMLElement | window | document | SVGElement} elements - The iterable for chaining
 */
export default function empty (elements) {
    return setHtml(elements, '')
}
