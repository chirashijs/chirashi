import isDomElement from './isDomElement'

/**
 * Get first dom element from iterable or selector.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement|Text)} input - The iterable, selector or elements.
 * @return {(window|document|HTMLElement|SVGElement|Text|boolean)} element - The dom element from input or false if no element found.
 * @example //esnext
 * import { createElement, append, getElement } from 'chirashi'
 * const sushi = createElement('.sushi')
 * const unagi = createElement('.unagi')
 * const yakitori = createElement('.yakitori')
 * const sashimi = createElement('.sashimi')
 * append(document.body, [sushi, unagi, yakitori, sashimi])
 * getElement('div') //returns: <div class="sushi"></div>
 * getElement('.yakitori, .sashimi') //returns: <div class="yakitori"></div>
 * getElement([sushi, unagi, '.sashimi', '.unknown']) //returns: <div class="sushi"></div>
 * getElement('.wasabi') //returns: null
 * @example //es5
 * var sushi = Chirashi.createElement('.sushi')
 * var unagi = Chirashi.createElement('.unagi')
 * var yakitori = Chirashi.createElement('.yakitori')
 * var sashimi = Chirashi.createElement('.sashimi')
 * Chirashi.append(document.body, [sushi, unagi, yakitori, sashimi])
 * Chirashi.getElement('div') //returns: <div class="sushi"></div>
 * Chirashi.getElement('.yakitori, .sashimi') //returns: <div class="yakitori"></div>
 * Chirashi.getElement([sushi, unagi, '.sashimi', '.unknown']) //returns: <div class="sushi"></div>
 * Chirashi.getElement('.wasabi') //returns: null
 */
export default function getElement (input) {
  if (typeof input === 'string') return document.querySelector(input)

  if (input instanceof Array || input instanceof window.NodeList || input instanceof window.HTMLCollection) {
    return getElement(input[0])
  }

  return isDomElement(input) && input
}
