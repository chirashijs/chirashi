import _stringToArray from '../_internals/_stringToArray'
import forEach from '../core/forEach'
import setStyle from './setStyle'

/**
 * Clear inline style properties from elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {Object.<string, string>} style - The style options as object with key the property and value the string value.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { createElement, setStyle, clearStyle } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * setStyle(maki, {
 *   position: 'absolute',
 *   top: 10,
 *   width: 200,
 *   height: 200,
 *   background: 'red'
 * })
 * clearStyle(maki, ['position', top])
 * clearStyle(maki, 'width, height, background')
 * @example //es5
 * var maki = Chirashi.createElement('a.cheese.maki')
 * Chirashi.setStyle(maki, {
 *   position: 'absolute',
 *   top: 10,
 *   width: 200,
 *   height: 200,
 *   background: 'red'
 * })
 * Chirashi.clearStyle(maki, ['position', top])
 * Chirashi.clearStyle(maki, 'width, height, background')
 */
export default function clearStyle (elements, props) {
  props = _stringToArray(props)

  const style = {}
  forEach(props, prop => {
    style[prop] = ''
  })

  return setStyle(elements, style)
}
