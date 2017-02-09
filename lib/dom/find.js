import _getElements from '../_internals/_getElements'
import _chirasizeArray from '../_internals/_chirasizeArray'
import forElements from '../core/forElements'

/**
 * Iterates over each element of elements and returns an array containing all elements' children matching a selector.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {string} selector - The selector.
 * @return {(Array|NodeList|HTMLCollection)} found - The elements' descendants matching the selector.
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

function _findFromOne (found, selector, element) {
  found.push.apply(found, _getElements(element, selector))
}

export default function find (elements, selector) {
  if (elements.length) {
    let found = []

    forElements(elements, _findFromOne.bind(null, found, selector))

    return _chirasizeArray(found)
  } else {
    return _getElements(elements, selector)
  }
}
