import getLength from '../_internals/_getLength'

/**
 * Get element's height in pixels.
 * @param {(string|Array|NodeList|HTMLCollection|Element|HTMLElement)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {boolean} [offset=false] - If true height will include scrollbar and borders to size.
 * @return {number} height - The height in pixels.
 * @example //esnext
 * import { append, setStyle, getHeight } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyleProp('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * getHeight(maki, true) //returns: 260
 * getHeight(maki) //returns: 220
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyleProp('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * Chirashi.getHeight(maki, true) //returns: 260
 * Chirashi.getHeight(maki) //returns: 220
 */
export default function getHeight (element, offset = false) {
  return getLength(element, 'Height', offset)
}
