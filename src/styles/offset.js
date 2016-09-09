import getElement from '../core/getElement'

/**
* Return the top and left offset of an element. Offset is relative to web page
* @param {string | HTMLElement | window | document | SVGElement} element - The selector or dom element
* @return {object} offset
*/
export default function offset (element) {
    element = getElement(element)
    if (!element) return false

    let rect = element.getBoundingClientRect()

    return {
        top: rect.top + (document.documentElement.scrollTop || document.body.scrollTop),
        left: rect.left + (document.documentElement.scrollLeft || document.body.scrollLeft)
    }
}
