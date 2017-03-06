import clientRect from './clientRect'

/**
 * Return the screen relative position of an element.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(Object|boolean)} screenPosition - Element's screen position or false if no element found.
 * @return {Object.top} top - Y-coordinate, relative to the viewport origin, of the top of the rectangle box.
 * @return {Object.left} left - X-coordinate, relative to the viewport origin, of the left of the rectangle box.
 * @example esnext
 * import { setStyle, append, screenPosition } from 'chirashi'
 *
 * setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * append(document.body, '.poulp')
 *
 * const poulp = setStyleProp('.poulp', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   background: 'red'
 * })
 *
 * screenPosition(poulp) // returns: { top: 200, left: 240 }
 * @example es5
 * Chirashi.setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * Chirashi.append(document.body, '.poulp')
 *
 * var poulp = Chirashi.setStyleProp('.poulp', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   background: 'red'
 * })
 *
 * Chirashi.screenPosition(poulp) // returns: { top: 200, left: 240 }
 */
export default function screenPosition (element) {
  const rect = clientRect(element)

  return rect && {
    top: rect.top,
    left: rect.left
  }
}
