import _updateClassList from '../_internals/_updateClassList'

/**
 * Iterates over classes and add it on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {(string|string[])} classes - Array of classes or string of classes seperated with comma and/or spaces.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { createElement, addClass } from 'chirashi'
 * const maki = createElement('div')
 * addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * addClass(maki, 'seaweed', 'cheese') //returns: <div class="wasabi seaweed cheese"></div>
 * addClass(maki, 'avocado', 'salmon') //returns: <div class="wasabi seaweed cheese avocado salmon"></div>
 * @example //es5
 * var maki = Chirashi.createElement('div')
 * Chirashi.addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * Chirashi.addClass(maki, 'seaweed', 'cheese') //returns: <div class="wasabi seaweed cheese"></div>
 * Chirashi.addClass(maki, 'avocado', 'salmon') //returns: <div class="wasabi seaweed cheese avocado salmon"></div>
 */
export default function addClass (elements, ...classes) {
  return _updateClassList(elements, 'add', classes)
}
