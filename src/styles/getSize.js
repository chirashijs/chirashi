import getWidth from './getWidth'
import getHeight from './getHeight'

/**
 * Get size in pixels of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
 * @return {number} size - The size in pixels
 */
export default function getSize (element, inner = false) {
  return {
    width: getWidth(element, inner),
    height: getHeight(element, inner)
  }
}
