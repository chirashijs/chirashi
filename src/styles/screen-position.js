import getElement from '../core/get-element'

/**
* Return the screen relative position of an element
* @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
* @return {object} screenPosition
*/
export default function screenPosition (element) {
    element = getElement(element)

    return !!element && element.getBoundingClientRect()
}
