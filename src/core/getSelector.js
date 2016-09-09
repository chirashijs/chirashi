/**
 * Get a dom element from selector.
 * @param {string} selector - The query selector
 * @return {HTMLElement | window | document | SVGElement} domElement - The first dom element matching selector
 */
export default function getSelector (selector) {
    return document.querySelector(selector)
}
