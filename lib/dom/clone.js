import getElement from '../core/getElement'

/**
 * Clones element.
 * @param {(string|HTMLElement|SVGElement)} element - Selector or element.
 * @return {(string|HTMLElement|SVGElement|boolean)} clone - element's clone or false if element isn't a dom element or can't be cloned.
 * @example //esnext
 * import { createElement, append, clone } from 'chirashi'
 * const maki = createElement('.maki')
 * clone(maki) //returns: <div class="maki"></div>
 * const sushi = createElement('.sushi')
 * append(document.body, sushi)
 * clone('.sushi') //returns: <div class="sushi"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.clone(maki) //returns: <div class="maki"></div>
 * var sushi = Chirashi.createElement('.sushi')
 * Chirashi.append(document.body, sushi)
 * Chirashi.clone('.sushi') //returns: <div class="sushi"></div>
 */
export default function clone (element) {
  return !!(element = getElement(element)) && 'cloneNode' in element && element.cloneNode(true)
}
