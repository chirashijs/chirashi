import forEach from '../core/forEach'
import getElement from '../core/getElement'
import isDomElement from '../core/isDomElement'
import createElement from './createElement'

/**
 * Insert nodes before element in his parent.
 * @param {(string|HTMLElement|SVGElement|Text)} element - The selector or dom element.
 * @param {(Array|string|HTMLElement|SVGElement|Text)} nodes - Array of dom elements or string to create it using createElement.
 * @return {(HTMLElement|SVGElement|undefined)} element - The element for chaining or undefined if no element found or element has no parent.
 * @example //esnext
 * import { createElement, append, insertBefore } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]'])
 * insertBefore('.cheese', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]'])
 * Chirashi.insertBefore('.cheese', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 */
export default function insertBefore (element, nodes) {
  element = getElement(element)

  if (!element || !('parentNode' in element)) return

  const parent = element.parentNode

  forEach(nodes, (node, index) => {
    if (typeof node === 'string') {
      node = createElement(node)
    }

    if (isDomElement(node)) parent.insertBefore(node, element)
  }, true)

  return element
}
