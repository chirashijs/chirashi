import getElement from '../core/getElement'
import _getElement from '../_internals/_getElement'

/**
 * Find the first element's child matching the selector.
 * @param {(string|Array|NodeList|HTMLCollection|Element|Document|ParentNode)} element - The parent node. Note that it'll be passed to getElement to ensure there's only one.
 * @param {string} selector - The selector to match.
 * @return {(Element|null)} element - The first child of elements matching the selector or null.
 * @example //esnext
 * import { createElement, append, find } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * const roll = createElement('.roll')
 * append(roll, '.tuna[data-fish][data-inside]')
 * append(document.body, [maki, roll])
 * findOne('div', '[data-fish]') //returns: <div class="salmon" data-fish data-inside></div>
 * findOne(maki, '[data-inside]') //returns: <div class="salmon" data-fish data-inside></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * var roll = Chirashi.createElement('.roll')
 * Chirashi.append(roll, '.tuna[data-fish][data-inside]')
 * Chirashi.append(document.body, [maki, roll])
 * Chirashi.findOne('div', '[data-fish]') //returns: <div class="salmon" data-fish data-inside></div>
 * Chirashi.findOne(maki, '[data-inside]') //returns: <div class="salmon" data-fish data-inside></div>
 */
export default function findOne (element, selector) {
  return (element = getElement(element)) ? _getElement(element, selector) : null
}
