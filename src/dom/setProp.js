import forElements from '../core/forElements'

/**
 * Apply props as key value pairs on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | document | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {object} - The props key value pairs.
 * @return {Array} elements - The elements for chaining.
 * @example //esnext
 * import { createElement, setProp, getProp } from 'chirashi'
 * const maki = createElement('input.maki')
 * setProp(maki, { value: 'こんにちは世界' })
 * getProp(maki, 'value') //returns: こんにちは世界
 * @example //es5
 * var maki = Chirashi.createElement('input.maki')
 * Chirashi.setProp(maki, { value: 'こんにちは世界' })
 * Chirashi.getProp(maki, 'value') //returns: こんにちは世界
 */
export default function setProp (elements, props) {
  return forElements(elements, element => Object.assign(element, props))
}
