import getElement from '../core/getElement'
import _chirasizeArray from '../_internals/_chirasizeArray'

/**
 * Returns an array of every element's ancestors.
 * @param {(string|Array|NodeList|HTMLCollection|Node)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {Array.<Node>} parents - Array of element's ancestors.
 * @example //esnext
 * import { createElement, append, parents } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * parents('.salmon') //returns: [<div class="maki">...</div>, <body>...</body>, <html>...</html>, document]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * append(maki
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * Chirashi.parents('.salmon') //returns: [<div class="maki">...</div>, <body>...</body>, <html>...</html>, document]
 */
export default function parents (element) {
  return _chirasizeArray(_getParents(getElement(element)))
}

function _getParents (element, arr = []) {
  let parent
  if (element && (parent = element.parentNode)) {
    arr.push(parent)

    return _getParents(parent, arr)
  }

  return arr
}
