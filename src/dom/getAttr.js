import getProp from './getProp'
import getData from './getData'

/**
 * Get value for named attribute of element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element.
 * @param {string} name - The attribute's name.
 * @return {string} value - The value for the attribute.
 * @example //esnext
 * import { createElement, getAttr } from 'chirashi'
 * const maki = createElement('.maki[data-fish="salmon"]')
 * getAttr(maki, 'data-fish') //returns: "salmon"
 * @example //es5
 * const maki = Chirashi.createElement('.maki[data-fish="salmon"]')
 * Chirashi.getAttr(maki, 'data-fish') //returns: "salmon"
 */
export default function getAttr (element, name) {
  return name.indexOf('data') === 0 ? getData(element, name) : getProp(element, name)
}
