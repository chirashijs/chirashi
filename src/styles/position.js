import getElement from '../core/get-element'

/**
* Return the top and left position of an element. Position is relative to parent
* @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
* @return {object} position
*/
export default function position (element) {
    element = getElement(element)

    return !!element && {
        top: element.offsetTop,
        left: element.offsetLeft
    }
}
