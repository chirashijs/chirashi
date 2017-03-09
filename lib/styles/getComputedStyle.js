import getElement from '../core/getElement'

/**
 * Get computed style of an element.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {Object<string, string>} computedStyle - the computed style of the element.
 * @example //esnext
 * import { append, setStyleProp, getComputedStyle } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyleProp('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * getComputedStyle(maki) //returns: { display: 'block', position: 'relative', top: '10px', [... other properties according to the browser] }
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyleProp('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * Chirashi.getComputedStyle(maki) //returns: { display: 'block', position: 'relative', top: '10px', [... other properties according to the browser] }
 */
export default function getComputedStyle (element) {
  return !!(element = getElement(element)) && window.getComputedStyle(element)
}
