import getElement from '../core/getElement'

/**
 * Get value for named attribute of element.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @param {string} name - The attribute's name.
 * @return {(string|boolean)} value - The value for the attribute or false if no element found.
 * @example //esnext
 * import { createElement, getAttr } from 'chirashi'
 * const maki = createElement('.maki[data-fish="salmon"]')
 * getAttr(maki, 'data-fish') //returns: "salmon"
 * @example //es5
 * const maki = Chirashi.createElement('.maki[data-fish="salmon"]')
 * Chirashi.getAttr(maki, 'data-fish') //returns: "salmon"
 */
export default function getAttr (element, name) {
  element = getElement(element)

  return !!element && element.getAttribute(name)
}
