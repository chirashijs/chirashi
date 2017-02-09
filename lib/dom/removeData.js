import forEach from '../core/forEach'
import _stringToArray from '../_internals/_stringToArray'
import _applyForEach from '../_internals/_applyForEach'

/**
 * Iterates over attributes and removes it from each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {(string|string[])} attributes - Array of attributes' name, string of attributes' name seperated by space and/or comas or name of a single attribute.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
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

function _prefixAttr (attributes, attr, index) {
  attributes[index] = 'data-' + attr
}

export default function removeData (elements, attributes) {
  attributes = _stringToArray(attributes)
  forEach(attributes, _prefixAttr.bind(null, attributes))

  return _applyForEach(elements, 'removeAttribute', attributes)
}
