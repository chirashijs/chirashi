import _updateClassList from '../_internals/_updateClassList'

/**
 * Iterates over classes and add it on each element of elements or ignore it if already set.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {...string} classes - Classes to add.
 * @return {Array} domElements - The array of dom elements from elements for chaining.
 * @example //esnext
 * import { createElement, addClass } from 'chirashi'
 * const maki = createElement('.maki')
 * addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * addClass(maki, 'seaweed', 'cheese') //returns: <div class="wasabi seaweed cheese"></div>
 * addClass('.maki', 'avocado', 'salmon') //returns: <div class="wasabi seaweed cheese avocado salmon"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * Chirashi.addClass(maki, 'seaweed', 'cheese') //returns: <div class="wasabi seaweed cheese"></div>
 * Chirashi.addClass('.maki', 'avocado', 'salmon') //returns: <div class="wasabi seaweed cheese avocado salmon"></div>
 */
export default function addClass (elements, ...classes) {
  return _updateClassList(elements, 'add', classes)
}
