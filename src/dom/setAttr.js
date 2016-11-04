import forIn from '../core/forIn'
import setProp from './setProp'
import setData from './setData'

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
  const props = {}
  const dataAttributes = {}

  forIn(attributes, (name, value) => {
    if (typeof value !== 'string' && !(value instanceof Array)) {
      value = JSON.stringify(value)
    }

    if (name.indexOf('data') === 0) {
      dataAttributes[name] = value
    } else {
      props[name] = value
    }
  })

  setProp(elements, props)

  return setData(elements, dataAttributes)
}
