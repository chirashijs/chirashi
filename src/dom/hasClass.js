import getElement from '../core/getElement'

/**
 * Iterates over classes and test if element has each.
 * @param {string | HTMLElement | SVGElement} element - The selector or dom element.
 * @param {string | Array} classes - Array of classes, classes seperated by coma and/or spaces or single class.
 * @return {bool} hasClass - Is true if element has all classes.
 * @example //esnext
 * import { createElement, hasClass } from 'chirashi'
 * const maki = createElement('.salmon.cheese.maki')
 * hasClass(maki, 'salmon cheese') //returns: true
 * hasClass(maki, ['salmon', 'avocado']) //returns: false
 * @example //es5
 * var maki = Chirashi.createElement('.salmon.cheese.maki')
 * Chirashi.hasClass(maki, 'salmon cheese') //returns: true
 * Chirashi.hasClass(maki, ['salmon', 'avocado']) //returns: false
 */
export default function hasClass (element, classes) {
  element = getElement(element)
  if (!element || !element.classList) return

  if (typeof classes === 'string') classes = classes.split(/[\s,]+/g)

  let i = classes.length
  let found
  while (i-- && (found = element.classList.contains(classes[i]))) {}

  return found
}