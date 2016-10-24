import getElement from '../core/getElement'

/**
 * Returns index of element in parent's children.
 * @param {string | HTMLElement | SVGElement | Text} element - The selector or dom element.
 * @return {Number} index - The position of element in his parent's children.
 * @example //esnext
 * import { createElement, append, indexInParent } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * indexInParent('.cheese') //returns: 1
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.indexInParent('.cheese') //returns: 1
 */
export default function indexInParent (element) {
  element = getElement(element)

  if (!element) return null

  let current = element
  let i = 0
  while ((current = current.previousElementSibling)) ++i

  return i
}
