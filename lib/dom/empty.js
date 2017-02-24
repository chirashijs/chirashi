import forElements from '../core/forElements'
import remove from './remove'

/**
 * Remove every child of elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @return {Array} domElements - The array of dom elements from elements for chaining.
 * @example //esnext
 * import { createElement, append, empty } from 'chirashi'
 * const maki = createElement('.maki') //returns: <div class="maki"></div>
 * append(maki, '.cheese') //returns: <div class="maki"><div class="cheese"></div></div>
 * empty(maki) //returns: [<div class="maki"></div>]
 * @example //es5
 * const maki = Chirashi.createElement('.maki') //returns: <div class="maki"></div>
 * Chirashi.append(maki, '.cheese') //returns: <div class="maki"><div class="cheese"></div></div>
 * Chirashi.empty(maki) //returns: [<div class="maki"></div>]
 */
export default function empty (elements) {
  return forElements(elements, _emptyElement)
}

function _emptyElement (element) {
  remove(element.children)
}
