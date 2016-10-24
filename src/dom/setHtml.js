import forElements from '../core/forElements'

/**
 * Set the inner html of elements.
 * @param {Array | string | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @return {string} htmlString - The html to insert.
 * @example //esnext
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
export default function setHtml (elements, string) {
  return forElements(elements, element => {
    element.innerHTML = string
  })
}
