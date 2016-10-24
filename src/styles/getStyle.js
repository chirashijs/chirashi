import getElement from '../core/getElement'

/**
 * Get style property of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} value - The value for the property
 */
export default function getStyle (element, property) {
  element = getElement(element)
  if (!element) return

  let ret = window.getComputedStyle(element)[property]

  return ret.indexOf('px') === -1 ? ret : +ret
}
