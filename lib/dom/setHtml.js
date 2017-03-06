import setProp from './setProp'

/**
 * Set the inner html of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {string} html - The html to insert.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
* import { createElement, setHtml, getHtml } from 'chirashi'
* const maki = createElement('p.maki')
* setHtml(maki, 'salmon') //returns: [<p class="maki">salmon</p>]
* getHtml(maki) //returns: "salmon"
* @example //es5
* var maki = createElement('p.maki')
* setHtml(maki, 'salmon') //returns: [<p class="maki">salmon</p>]
* getHtml(maki) //returns: "salmon"
 */
export default function setHtml (elements, html) {
  return setProp(elements, {'innerHTML': html})
}
