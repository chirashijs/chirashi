import forEach from '../core/forEach'
import forElements from '../core/forElements'

/**
 * Iterates over attributes and removes it from each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {Array | string} attributes - Array of attributes' name, string of attributes' name seperated by space and/or comas or name of a single attribute.
 * @return {Array} elements - The elements for chaining.
 * import { createElement, append, removeAttr } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * removeAttr('.salmon', 'data-fish') //returns: [<div class="salmon"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon', '.cheese'], [{ 'data-fish': 'salmon' }, { 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.removeAttr('.salmon', 'data-fish') //returns: [<div class="salmon"></div>]
 */
export default function removeAttr (elements, attributes) {
  if (typeof attributes === 'string') attributes = attributes.split(/[,\s]+/g)

  return forElements(elements, element => {
    if (!element.removeAttribute) return

    forEach(attributes, element.removeAttribute.bind(element))
  })
}
