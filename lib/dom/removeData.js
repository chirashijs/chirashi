import _stringToArray from '../_internals/_stringToArray'
import _applyForEach from '../_internals/_applyForEach'

/**
 * Iterates over attributes and removes it from each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {(string|string[])} attributes - Array of attributes' name, string of attributes' name seperated by space and/or comas or name of a single attribute.
 * @return {Array} domElements - The array of dom elements from elements.
 * @return {function} domElements.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
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
export default function removeData (elements, attributes) {
  return _applyForEach(elements, 'removeAttribute', _stringToArray(attributes, 'data-'))
}
