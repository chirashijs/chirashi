import getElement from '../core/getElement'

/**
 * Clones element.
 * @param {(string|Array|NodeList|HTMLCollection|Node)} element - The node to clone. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(Node|boolean)} clone - element's clone or false if element isn't a node.
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
