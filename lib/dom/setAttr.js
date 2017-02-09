import forElements from '../core/forElements'
import forIn from '../core/forIn'

/**
 * Iterates over attributes as key value pairs and apply on each element of elements.
 * @param {Array | string | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {Object} - The attributes key value pairs.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
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

function _setAttributes (attributes, element) {
  forIn(attributes, element.setAttribute.bind(element))
}

function _stringifyValue (attributes, name, value) {
  if (typeof value !== 'string' && !(value instanceof Array)) {
    attributes[name] = JSON.stringify(value)
  }
}

export default function setAttr (elements, attributes) {
  forIn(attributes, _stringifyValue.bind(null, attributes))

  return forElements(elements, _setAttributes.bind(null, attributes))
}
