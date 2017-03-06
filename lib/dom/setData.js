import forIn from '../core/forIn'
import setAttr from './setAttr'

/**
 * Iterates over data-attributes as key value pairs and apply on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {Object.<string, (number|string)>} dataAttributes - The data-attributes key value pairs
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { createElement, setData } from 'chirashi'
 * const maki = createElement('.maki')
 * setData(maki, {
 *   fish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.setData(maki, {
 *   fish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 */
export default function setData (elements, dataAttributes) {
  const attributes = {}

  forIn(dataAttributes, _prefixAttribute.bind(null, attributes))

  return setAttr(elements, attributes)
}

function _prefixAttribute (attributes, name, value) {
  attributes['data-' + name] = value
}
