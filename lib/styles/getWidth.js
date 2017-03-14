import getLength from '../_internals/_getLength'

/**
 * Get element's width in pixels.
 * @param {(string|Array|NodeList|HTMLCollection|Element|HTMLElement)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {boolean} [offset=false] - If true width will include scrollbar and borders to size.
 * @return {number} width - The width in pixels.
 * @example //esnext
 * import { append, setStyleProp, getWidth } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyleProp('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * getWidth(maki, true) //returns: 260
 * getWidth(maki) //returns: 220
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyleProp('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * Chirashi.getWidth(maki, true) //returns: 260
 * Chirashi.getWidth(maki) //returns: 220
 */
export default function getWidth (element, offset = false) {
  return getLength(element, 'Width', offset)
}
