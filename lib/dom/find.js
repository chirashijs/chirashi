import _getElements from '../_internals/_getElements'
import _applyOnElements from '../_internals/_applyOnElements'

/**
 * Iterates over each element of elements and returns an array containing all elements' children matching a selector.
 * @param {(string|Array|NodeList|HTMLCollection|Element|Document|ParentNode)} elements - The iterable, selector or parent elements. Note that it'll be passed to getElements.
 * @param {string} selector - The selector.
 * @return {Array.<Element>} found - The array of elements' descendants matching the selector.
 * @example //esnext
 * import { createElement, append, find } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * const roll = createElement('.roll')
 * append(roll, '.tuna[data-fish][data-inside]')
 * append(document.body, [maki, roll])
 * find('div', '[data-fish]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="tuna" data-fish data-inside></div>]
 * find(maki, '[data-inside]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="avocado" data-inside></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * var roll = Chirashi.createElement('.roll')
 * Chirashi.append(roll, '.tuna[data-fish][data-inside]')
 * Chirashi.append(document.body, [maki, roll])
 * Chirashi.find('div', '[data-fish]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="tuna" data-fish data-inside></div>]
 * Chirashi.find(maki, '[data-inside]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="avocado" data-inside></div>]
 */
const find = _applyOnElements.bind(null, _findFromOne)
export default find

function _findFromOne (found, selector, element) {
  found.push.apply(found, _getElements(element, selector))
}
