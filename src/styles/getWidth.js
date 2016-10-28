import getProp from '../dom/getProp'

/**
 * Get width in pixels of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} width - The width in pixels
 */
export default function getWidth (element, inner = false) {
  return getProp(element, inner ? 'clientWidth' : 'offsetWidth')
}
