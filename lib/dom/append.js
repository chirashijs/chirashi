import forEach from '../core/forEach'
import getElement from '../core/getElement'
import createElement from './createElement'

/**
 * Appends each node to a parent node.
 * @param {(string|Array|NodeList|HTMLCollection|Node)} element - The parent node. Note that it'll be passed to getElement to ensure there's only one.
 * @param {(string|Array.<(string|Node)>|Node)} nodes - String, node or array of nodes and/or strings. Each string will be passed to createElement then append.
 * @return {(Node|boolean)} node - The node for chaining or false if nodes can't be appended.
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

  forEach(nodes, _appendOne.bind(null, element))

  return element
}

function _appendOne (element, node) {
  element.appendChild(typeof node === 'string' ? createElement(node) : node)
}
