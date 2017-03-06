import forElements from '../core/forElements'

/**
 * Remove every child of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Node)} elements - The iterable, selector or elements. Note that it'll be passed to getElements.
 * @return {Array} iterable - The getElements' result for chaining.
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
  return forElements(elements, _removeChildren)
}

function _removeChildren (element) {
  let child
  while ((child = element.firstChild)) {
    element.removeChild(child)
  }
}
