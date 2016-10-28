import _updateClassList from '../internals/_updateClassList'

/**
 * Iterates over classes and remove it from each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} elements - The iterable, selector or elements.
 * @param {string | Array} classes - Array of classes or string of classes seperated with comma and/or spaces.
 * @return {Array} elements - The elements for chaining.
 * @example //esnext
 * import { createElement, removeClass } from 'chirashi'
 * const maki = createElement('.salmon.cheese.maki') //returns: <div class="maki cheese salmon"></div>
 * removeClass(maki, 'cheese') //returns: [<div class="maki salmon"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.salmon.cheese.maki') //returns: <div class="maki cheese salmon"></div>
 * Chirashi.removeClass(maki, 'cheese') //returns: [<div class="maki salmon"></div>]
 */
export default function removeClass (elements, classes) {
  return _updateClassList(elements, 'remove', classes)
}
