/**
 * Alias on getAttr prefixing name with 'data-'.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element.
 * @param {string} name - The data-attribute's name.
 * @return {string} value - The value for the data-attribute.
 * @example //esnext
 * import { createElement, getData } from 'chirashi'
 * const maki = createElement('.maki[data-fish="salmon"]')
 * getData(maki, 'fish') //returns: "salmon"
 * @example //es5
 * const maki = Chirashi.createElement('.maki[data-fish="salmon"]')
 * Chirashi.getData(maki, 'fish') //returns: "salmon"
 */
export default function getData (element, name) {
  return element.getAttribute(name.indexOf('data') === 0 ? name : `data-${name}`)
}
