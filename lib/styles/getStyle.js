import getElement from '../core/getElement'

/**
 * Get style property of element.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element
 * @return {number} value - The value for the property
 * @example //esnext
 * import { append, setStyle, getStyle } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyle('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * getStyle(maki, 'display') //returns: "block"
 * getStyle(maki, 'top') //returns: 10
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyle('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * Chirashi.getStyle(maki, 'display') //returns: "block"
 * Chirashi.getStyle(maki, 'top') //returns: 10
 */
export default function getStyle (element, property) {
  element = getElement(element)
  if (!element) return

  let ret = window.getComputedStyle(element)[property]

  return ret.indexOf('px') === -1 ? ret : parseFloat(ret)
}
