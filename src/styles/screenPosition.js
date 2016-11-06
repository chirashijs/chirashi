import getElement from '../core/getElement'

/**
 * Return the screen relative position of an element.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @return {(Object|boolean)} screenPosition - Element's screen position or false if no element found.
 * @return {Object.bottom} bottom - Y-coordinate, relative to the viewport origin, of the bottom of the rectangle box. Read only.
 * @return {Object.height} height - Height of the rectangle box (This is identical to bottom minus top). Read only.
 * @return {Object.left} left - X-coordinate, relative to the viewport origin, of the left of the rectangle box. Read only.
 * @return {Object.right} right - X-coordinate, relative to the viewport origin, of the right of the rectangle box. Read only.
 * @return {Object.top} top - Y-coordinate, relative to the viewport origin, of the top of the rectangle box. Read only.
 * @return {Object.width} width - Width of the rectangle box (This is identical to right minus left). Read only.
 * @return {Object.x} x - X-coordinate, relative to the viewport origin, of the left of the rectangle box. Read only.
 * @return {Object.y} y - Y-coordinate, relative to the viewport origin, of the top of the rectangle box. Read only.
 * @example esnext
 * import { setStyle, append, screenPosition } from 'chirashi'
 *
 * setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * append(document.body, '.poulp')
 *
 * const poulp = setStyle('.poulp', {
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
 * Chirashi.setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * Chirashi.append(document.body, '.poulp')
 *
 * var poulp = Chirashi.setStyle('.poulp', {
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
  element = getElement(element)

  return !!element && element.getBoundingClientRect()
}
