import _chirasizeArray from '../_internals/_chirasizeArray'
import getProp from './getProp'

/**
 * Returns an array of element's children.
 * @param {(string|HTMLElement|SVGElement)} element - Selector or element.
 * @return {(Array|boolean)} children - Array of element's children or false if elements has no children property or isn't a dom element.
 * @return {function} children.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
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
  const children = getProp(element, 'children')

  return !!children && _chirasizeArray([...children])
}
