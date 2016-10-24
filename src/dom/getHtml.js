import getElement from '../core/getElement'

/**
 * Get the inner html of an element.
 * @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element.
 * @return {string} innerHTML - The inner html of the element.
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
  element = getElement(element)

  return element ? element.innerHTML : null
}
