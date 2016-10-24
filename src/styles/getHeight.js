import getElement from '../core/getElement'

/**
 * Get height in pixels of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} height - The height in pixels
 */
export default function getHeight (element, inner = false) {
  element = getElement(element)

  return !!element && (inner ? element.clientHeight : element.offsetHeight)
}
