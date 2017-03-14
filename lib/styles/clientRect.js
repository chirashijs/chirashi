import getElement from '../core/getElement'

/**
 * Return the screen relative position of an element.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(Object|boolean)} clientRect - Element's screen position or false if no element found.
 * @return {number} clientRect.bottom - Y-coordinate, relative to the viewport origin, of the bottom of the rectangle box.
 * @return {number} clientRect.height - Height of the rectangle box (This is identical to bottom minus top).
 * @return {number} clientRect.left - X-coordinate, relative to the viewport origin, of the left of the rectangle box.
 * @return {number} clientRect.right - X-coordinate, relative to the viewport origin, of the right of the rectangle box.
 * @return {number} clientRect.top - Y-coordinate, relative to the viewport origin, of the top of the rectangle box.
 * @return {number} clientRect.width - Width of the rectangle box (This is identical to right minus left).
 * @example esnext
 * import { setStyleProp, append, clientRect } from 'chirashi'
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
 * clientRect(poulp) // returns: { bottom: 300, height: 100, left: 240, right: 0, top: 200, width: 100 }
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
 * Chirashi.clientRect(poulp) // returns: { bottom: 300, height: 100, left: 240, right: 0, top: 200, width: 100 }
 */
export default function clientRect (element) {
  element = getElement(element)

  if (!element) return false

  const rect = element.getBoundingClientRect()

  // exhaustive because ClientRect use only getters breaking simple copies
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  }
}
