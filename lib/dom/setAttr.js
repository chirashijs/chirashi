import _parseAndApply from '../_internals/_parseAndApply'
import forIn from '../core/forIn'

/**
 * Iterates over attributes as key value pairs and apply on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {Object.<string, (number|string)>} attributes - The attributes key value pairs.
 * @return {Array} domElements - The array of dom elements from elements for chaining.
 * @example //esnext
 * import { createElement, setAttr } from 'chirashi'
 * const maki = createElement('.maki')
 * setAttr(maki, {
 *   dataFish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.setAttr(maki, {
 *   dataFish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 */
const setAttr = _parseAndApply.bind(null, _stringifyValue, _setAttributes)
export default setAttr

function _setAttributes (attributes, element) {
  forIn(attributes, element.setAttribute.bind(element))
}

function _stringifyValue (attributes, name, value) {
  if (typeof value !== 'string' && !(value instanceof Array)) {
    attributes[name] = JSON.stringify(value)
  }
}
