import forElements from '../core/forElements'

/**
 * Apply props as key value pairs on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Window|Node)} elements - The iterable, selector or elements.
 * @param {Object} props - The props key value pairs.
 * @return {Array} iterable - The getElements' result for chaining.
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
  return forElements(elements, _apply.bind(null, props))
}

function _apply (props, element) {
  Object.assign(element, props)
}
