import getProp from './getProp'

/**
 * Get the inner html of an element.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @return {(string|null)} innerHTML - The inner html of the element or null if no element found.
 * @example //esnext
 * import { createElement, setHtml, getHtml } from 'chirashi'
 * const maki = createElement('p.maki')
 * setHtml(maki, 'salmon')
 * getHtml(maki) //returns: "salmon"
 * @example //es5
 * var maki = createElement('p.maki')
 * setHtml(maki, 'salmon')
 * getHtml(maki) //returns: "salmon"
 */
export default function getHtml (element) {
  return getProp(element, 'innerHTML')
}
