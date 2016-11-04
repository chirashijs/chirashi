import forEach from '../core/forEach'
import getElement from '../core/getElement'
import isDomElement from '../core/isDomElement'
import createElement from './createElement'

/**
 * Insert nodes after element in his parent.
 * @param {string | HTMLElement | SVGElement | Text} element - The selector or dom element.
 * @param {Array | string | HTMLElement | SVGElement | Text} nodes - Array of dom elements or string to create it using createElement.
 * @param {Array} [attributes=[]] - The array of attributes' object ( only used with node creation so length should match number of strings in nodes ).
 * @return {HTMLElement | SVGElement} element - The element for chaining.
 * @example //esnext
 * import { createElement, append, insertAfter } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }])
 * insertAfter('.salmon', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }])
 * Chirashi.insertAfter('.salmon', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 */
export default function insertAfter (element, nodes) {
  element = getElement(element)

  if (!element || !('parentNode' in element)) return

  const parent = element.parentNode

  forEach(nodes, (node, index) => {
    if (typeof node === 'string') {
      node = createElement(node)
    }

    if (isDomElement(node)) parent.insertBefore(node, element.nextElementSibling)
  }, true)

  return element
}
