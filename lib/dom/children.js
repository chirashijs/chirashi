import getProp from './getProp'

/**
 * Returns an element's children.
 * @param {(string|HTMLElement|SVGElement)} element - Selector or element.
 * @return {HTMLCollection} children - Element's children or null if elements has no children property or isn't a dom element.
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
  return getProp(element, 'children')
}
