import getElement from '../core/getElement'

/**
 * Returns an array of element's children.
 * @param {string | HTMLElement | SVGElement} element - Selector or element.
 * @return {Array} children - element's clone.
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
  element = getElement(element)

  return !!element && 'children' in element && [...element.children]
}
