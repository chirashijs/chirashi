import forIn from '../core/forIn'
import setAttr from './setAttr'

/**
 * Iterates over data-attributes as key value pairs and apply on each element of elements.
 * @param {Array | string | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {object} - The data-attributes key value pairs.
 * @return {Array} elements - The elements for chaining.
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
  forIn(dataAttributes, (name, value) => {
    attributes[`data-${name}`] = value
  })

  setAttr(elements, attributes)
}
