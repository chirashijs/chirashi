import forEach from '../core/forEach'
import _applyForEach from '../_internals/_applyForEach'

/**
 * Iterates over attributes and removes it from each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {...string} attributes - Names of data attributes to remove.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { createElement, append, removeData } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * removeData('.salmon', 'fish') //returns: [<div class="salmon"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.removeData('.salmon', 'fish') //returns: [<div class="salmon"></div>]
 */
export default function removeData (elements, ...attributes) {
  forEach(attributes, _prefixAttr.bind(null, attributes))

  return _applyForEach(elements, 'removeAttribute', attributes)
}

function _prefixAttr (attributes, attr, index) {
  attributes[index] = 'data-' + attr
}
