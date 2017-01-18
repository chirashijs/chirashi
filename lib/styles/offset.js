import screenPosition from './screenPosition'

/**
 * Returns the top and left offset of an element. Offset is relative to web page.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @return {(Object|boolean)} offset - Offset object or false if no element found.
 * @return {Object.top} top - Top offset in pixels.
 * @return {Object.left} left - Left offset in pixels.
 * @example //esnext
 * import { setStyle, append, offset }
 * setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 * append(document.body, '.sushi')
 * const sushi = setStyle('.sushi', {
 *   display: 'block',
 *   width: 100,
 *   height: 100,
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   background: 'red'
 * })
 * offset(sushi) // returns: { top: 200, left: 240 }
 * @example //es5
 * Chirashi.setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 * Chirashi.append(document.body, '.sushi')
 * var sushi = Chirashi.setStyle('.sushi', {
 *   display: 'block',
 *   width: 100,
 *   height: 100,
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   background: 'red'
 * })
 * Chirashi.offset(sushi) // returns: { top: 200, left: 240 }
 */
export default function offset (element) {
  const screenPos = screenPosition(element)

  return screenPos && {
    top: screenPos.top + window.scrollY,
    left: screenPos.left + window.scrollX
  }
}
