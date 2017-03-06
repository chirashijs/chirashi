import getElement from '../core/getElement'

/**
 * Iterates over classes and test if element has each.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {...string} classes - Classes to test.
 * @return {boolean} hasClass - Is true if element has all classes.
 * @example //esnext
 * import { createElement, hasClass } from 'chirashi'
 * const maki = createElement('.salmon.cheese.maki')
 * hasClass(maki, 'salmon', 'cheese') //returns: true
 * hasClass(maki, 'salmon', 'avocado') //returns: false
 * @example //es5
 * var maki = Chirashi.createElement('.salmon.cheese.maki')
 * Chirashi.hasClass(maki, 'salmon', 'cheese') //returns: true
 * Chirashi.hasClass(maki, 'salmon', 'avocado') //returns: false
 */
export default function hasClass (element, ...classes) {
  element = getElement(element)
  if (!element) return

  const n = classes.length
  let found
  let i = 0
  while (i < n && (found = element.classList.contains(classes[i++]))) {}

  return found
}
