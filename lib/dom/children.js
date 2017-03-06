import _nodelistToArray from '../_internals/_nodelistToArray'
import getProp from './getProp'

/**
 * Returns an element's children as Array.
 * @param {(string|Array|NodeList|HTMLCollection|Node)} element - The parent node. Note that it'll be passed to getElement to ensure there's only one.
 * @return {Array.<Element>} children - Element's children as array.
 * @example //esnext
 * import { createElement, append, children } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, ['.salmon', '.avocado'])
 * children(maki) //returns: [<div class="salmon"></div>, <div class="avocado"></div>]
 * @example //es5
 * const maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, ['.salmon', '.avocado'])
 * Chirashi.children(maki) //returns: [<div class="salmon"></div>, <div class="avocado"></div>]
 */
export default function children (element) {
  return _nodelistToArray(getProp(element, 'children'))
}
