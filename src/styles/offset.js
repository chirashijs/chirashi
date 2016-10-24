import getElement from '../core/getElement'

/**
* Return the top and left offset of an element. Offset is relative to web page
* @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
* @return {object} offset
* @return {object.top} top offset
* @return {object.left} left offset
*/
export default function offset (element) {
  element = getElement(element)
  if (!element) return false

  let rect = element.getBoundingClientRect()

  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX
  }
}
