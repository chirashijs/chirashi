import forEach from '../core/forEach'
import getElement from '../core/getElement'
import isDomElement from '../core/isDomElement'
import createElement from './createElement'

/**
 * Appends each node to element.
 * @param {(string|HTMLElement|SVGElement)} element - Selector or element.
 * @param {(Array|string|HTMLElement|SVGElement|Text)} nodes - Dom element, string or array of dom elements or strings. Strings will be passed to createElement then append.
 * @return {(HTMLElement|SVGElement|boolean)} element - The element for chaining or false if nodes can't be appended.
 * @example //esnext
 * import { createElement, append } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 */
export default function append (element, nodes) {
  element = getElement(element)

  if (!element || !element.appendChild) return false

  forEach(nodes, (node, index) => {
    if (typeof node === 'string') {
      element.appendChild(createElement(node))
    } else if (isDomElement(node)) {
      element.appendChild(node)
    }
  }, true)

  return element
}
