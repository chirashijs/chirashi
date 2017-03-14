import getElement from '../core/getElement'

/**
 * Return the top and left position of an element. Position is relative to parent.
 * @param {(string|Array|NodeList|HTMLCollection|document|Element)} element - The selector or dom element.
 * @return {(Object|boolean)} offset - Offset object or false if no element found.
 * @return {Object.top} top - Top position in pixels.
 * @return {Object.left} left - Left position in pixels.
 * @example //esnext
 * import { append, setStyleProp, position } from 'chirashi'
 *
 * setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * append(document.body, '.maki')
 * append('.maki', '.salmon')
 *
 * setStyleProp('.maki', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   borderRadius: '50%',
 *   background: 'black'
 * })
 *
 * const salmon = setStyleProp('.salmon', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 20,
 *   left: 10,
 *   width: 10,
 *   height: 10,
 *   borderRadius: '50%',
 *   background: 'pink'
 * })
 *
 * position(salmon) // returns: { top: 20, left: 10 }
 * @example //es5
 * Chirashi.setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * Chirashi.append(document.body, '.maki')
 * Chirashi.append('.maki', '.salmon')
 *
 * Chirashi.setStyleProp('.maki', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   borderRadius: '50%',
 *   background: 'black'
 * })
 *
 * var salmon = Chirashi.setStyleProp('.salmon', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 20,
 *   left: 10,
 *   width: 10,
 *   height: 10,
 *   borderRadius: '50%',
 *   background: 'pink'
 * })
 *
 * Chirashi.position(salmon) // returns: { top: 20, left: 10 }
 */
export default function position (element) {
  return !!(element = getElement(element)) && {
    top: element.offsetTop,
    left: element.offsetLeft
  }
}
