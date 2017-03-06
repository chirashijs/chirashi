import getWidth from './getWidth'
import getHeight from './getHeight'

/**
 * Get element's size in pixels.
 * @param {(string|Array|NodeList|HTMLCollection|Element|HTMLElement)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {boolean} [offset=false] - If true size will include scrollbar and borders.
 * @return {number} size - The size in pixels.
 * @example //esnext
 * import { append, setStyle, getSize } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyleProp('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * getSize(maki, true) //returns: { width: 260, height: 260 }
 * getSize(maki) //returns: { width: 220, height: 220 }
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyleProp('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * Chirashi.getSize(maki, true) //returns: { width: 260, height: 260 }
 * Chirashi.getSize(maki) //returns: { width: 220, height: 220 }
 */
export default function getSize (element, offset = false) {
  return {
    width: getWidth(element, offset),
    height: getHeight(element, offset)
  }
}
