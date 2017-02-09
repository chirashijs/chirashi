import getElement from '../core/getElement'
import _chirasizeArray from '../_internals/_chirasizeArray'

/**
 * Returns the parent node of the element.
 * @param {(string|document|HTMLElement|SVGElement|Text)} element - The selector or dom element.
 * @return {(document|HTMLElement|SVGElement|null)} parentElement - The parent node or null if no element found.
 * @example //esnext
 * import { createElement, append, parent } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * parent('.salmon') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * append(maki
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * Chirashi.parent('.salmon') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 */

function _getParents (element, arr = []) {
  const parent = element.parentNode
  if (parent && parent !== document) {
    arr.push(parent)

    return _getParents(parent, arr)
  }

  return arr
}

export default function parents (element) {
  return _chirasizeArray(_getParents(getElement(element)))
}
