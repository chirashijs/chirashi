import _applyForEach from '../internals/_applyForEach'
import forIn from '../core/forIn'

/**
 * Iterates over attributes as key value pairs and apply on each element of elements.
 * @param {Array | string | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {object} - The attributes key value pairs.
 * @return {Array} elements - The elements for chaining.
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
export default function setAttr (elements, attributes) {
  forIn(attributes, (name, value) => {
    if (value instanceof Array) {
      attributes[name] = value.join(' ')
    } else if (typeof value !== 'string') {
      attributes[name] = JSON.stringify(value)
    }
  })

  return _applyForEach(elements, 'setAttribute', attributes)
}
