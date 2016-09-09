import getElement from '../core/getElement'

/**
 * Test if element has all the classes.
 * @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
 * @param {string} classes - The classes seperated with spaces
 * @return {bool} hasClass - True if element has all the classes, false otherwise
 */
export default function hasClass (element, classes) {
    element = getElement(element)
    if (!element || !element.classList) return

    classes = classes.split(' ')

    let i = classes.length, found = false
    while(i-- && (found = element.classList.contains(classes[i]))) {}

    return found
}
