import forEach from '../core/forEach'
import getElement from '../core/getElement'
import isDomElement from '../core/isDomElement'
import createElement from './createElement'

/**
 * Appends each node to element.
 * @param {string | HTMLElement | SVGElement} element - Selector or element.
 * @param {Array | string | HTMLElement | SVGElement | Text} nodes - Array of dom elements or string to create it using createElement.
 * @param {Array} [attributes=[]] - The array of attributes' object ( only used with node creation so length should match number of strings in nodes ).
 * @return {HTMLElement | SVGElement} element - The element for chaining.
 * @example //esnext
 * import { createElement, append } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 */
export default function append (element, nodes, attributes = []) {
  element = getElement(element)

  if (!element || !element.appendChild) return

  let attributeIndex = 0
  forEach(nodes, (node, index) => {
    if (typeof node === 'string') {
      node = createElement(node, attributes[attributeIndex++] || {})
    }

    if (isDomElement(node)) element.appendChild(node)
  }, true)

  return element
}
