import _updateClassList from '../_internals/_updateClassList'

/**
 * Iterates over classes and remove it from each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement|Text)} elements - The iterable, selector or elements.
 * @param {...string} classes - Classes to remove.
 * @return {Array} domElements - The array of dom elements from elements for chaining.
 * @example //esnext
 * import { createElement, removeClass } from 'chirashi'
 * const maki = createElement('.maki.salmon.cheese.wasabi') //returns: <div class="maki salmon cheese wasabi"></div>
 * removeClass(maki, 'cheese', 'wasabi') //returns: [<div class="maki salmon"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki.salmon.cheese.wasabi') //returns: <div class="maki salmon cheese wasabi"></div>
 * Chirashi.removeClass(maki, 'cheese', 'wasabi') //returns: [<div class="maki salmon"></div>]
 */
export default function removeClass (elements, ...classes) {
  return _updateClassList(elements, 'remove', classes)
}
