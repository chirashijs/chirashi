import getElement from '../core/getElement'

/**
 * Get width in pixels of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} width - The width in pixels
 */
export default function getWidth (element, inner = false) {
  element = getElement(element)

  return !!element && (inner ? element.clientWidth : element.offsetWidth)
}
