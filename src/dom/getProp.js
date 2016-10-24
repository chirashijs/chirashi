import getElement from '../core/getElement'

/**
 * Get the value for the property name on the element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element.
 * @param {string} property - The name of the property.
 * @return {string} value - The value for the property.
 * @example //esnext
 * import { createElement, append, getProp } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon')
 * getProp(maki, 'firstChild') //returns: <div class="salmon"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon')
 * Chirashi.getProp(maki, 'firstChild') //returns: <div class="salmon"></div>
 */
export default function getProp (element, property) {
  element = getElement(element)

  return !!element && element[property]
}
