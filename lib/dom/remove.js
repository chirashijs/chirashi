import forElements from '../core/forElements'

/**
 * Iterates over elements and removes it from DOM.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @return {(Array|NodeList|HTMLCollection)} removedElements - The array or nodelist of removed dom elements.
 * @example //esnext
 * import { createElement, append, remove } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * remove('.cheese') //returns: [<div class="cheese" data-cheese="cream"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.remove('.cheese') //returns: [<div class="cheese" data-cheese="cream"></div>]
 */
export default function remove (elements) {
  return forElements(elements, _removeOne)
}

function _removeOne (element) {
  if (!element.parentNode) return

  element.parentNode.removeChild(element)
}
