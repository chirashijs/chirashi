/**
 * Test if element is a dom element.
 * @param {HTMLElement | window | document | SVGElement} element - If element doesn't match of this types false will be returned
 * @return {bool} isDomElement - true if element is a dom element, false otherwise
 */
export default function isDomElement(element) {
    return element instanceof HTMLElement || element === window || element === document || element instanceof SVGElement
}
