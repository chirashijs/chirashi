import forEach from '../core/forEach'
import setStyleProp from './setStyleProp'

/**
 * Clear inline style properties from elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement)} elements - The iterable, selector or elements.
 * @param {...string} props - The style properties to clear.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { createElement, setStyle, clearStyle } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * setStyleProp(maki, {
 *   position: 'absolute',
 *   top: 10,
 *   width: 200,
 *   height: 200,
 *   background: 'red'
 * }) // returns: [<a class="cheese maki" style="position: 'absolute'; top: '10px'; width: '200px'; height: '200px'; background: 'red';"></a>]
 * clearStyle(maki, 'width', 'height', 'background') // returns: [<a class="cheese maki" style="position: 'absolute'; top: '10px';"></a>]
 * @example //es5
 * var maki = Chirashi.createElement('a.cheese.maki')
 * Chirashi.setStyleProp(maki, {
 *   position: 'absolute',
 *   top: 10,
 *   width: 200,
 *   height: 200,
 *   background: 'red'
 * }) // returns: [<a class="cheese maki" style="position: 'absolute'; top: '10px'; width: '200px'; height: '200px'; background: 'red';"></a>]
 * Chirashi.clearStyle(maki, 'width', 'height', 'background') // returns: [<a class="cheese maki" style="position: 'absolute'; top: '10px';"></a>]
 */
export default function clearStyle (elements, ...props) {
  const style = {}
  forEach(props, _resetProp.bind(null, style))

  return setStyleProp(elements, style)
}

function _resetProp (style, prop) {
  style[prop] = ''
}
