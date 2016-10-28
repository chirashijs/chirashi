import getProp from '../dom/getProp'

/**
 * Get height in pixels of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} height - The height in pixels
 */
export default function getHeight (element, inner = false) {
  return getProp(element, inner ? 'clientHeight' : 'offsetHeight')
}
