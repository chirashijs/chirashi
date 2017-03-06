import _nodeInsertion from '../_internals/_nodeInsertion'
import createElement from './createElement'

/**
 * Insert nodes after element in his parent.
 * @param {(string|Array|NodeList|HTMLCollection|NonDocumentTypeChildNode)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {(Array<(string|Node)>|string|Node)} nodes - Array of dom elements or string to create it using createElement.
 * @return {(Node|undefined)} element - The element for chaining or undefined if no element found or element has no parent.
 * @example //esnext
 * import { createElement, append, insertAfter } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]'])
 * insertAfter('.salmon', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]'])
 * Chirashi.insertAfter('.salmon', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 */
const insertAfter = _nodeInsertion.bind(null, _insertAfter)
export default insertAfter

function _insertAfter (parent, element, node) {
  parent.insertBefore(typeof node === 'string' ? createElement(node) : node, element.nextElementSibling)
}
