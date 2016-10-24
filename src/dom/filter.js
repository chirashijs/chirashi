import getElements from '../core/getElements'

/**
 * Iterates over elements, returning an array of all elements matching tested selector.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} elements - The iterable, selector or elements.
 * @param {string | HTMLElement | SVGElement | Text} tested - The selector or dom element to match.
 * @return {Array} matching - The array of filtered elements.
 * @example //esnext
 * import { createElement, append, filter } from 'chirashi'
 * const salmonMaki = createElement('.salmon.maki')
 * const tunaMaki = createElement('.tuna.maki')
 * const salmonSushi = createElement('.salmon.sushi')
 * const tunaSushi = createElement('.tuna.sushi')
 * append(document.body, [salmonMaki, tunaMaki, salmonSushi, tunaSushi])
 * filter('div', '.salmon') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon"></div>]
 * filter([salmonMaki, tunaMaki, salmonSushi, tunaSushi], '.maki') //returns: [<div class="maki salmon"></div>, <div class="maki tuna"></div>]
 * filter('div', '.salmon') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon"></div>]
 * @example //es5
 * const salmonMaki = Chirashi.createElement('.salmon.maki')
 * const tunaMaki = Chirashi.createElement('.tuna.maki')
 * const salmonSushi = Chirashi.createElement('.salmon.sushi')
 * const tunaSushi = Chirashi.createElement('.tuna.sushi')
 * Chirashi.append(document.body, [salmonMaki, tunaMaki, salmonSushi, tunaSushi])
 * Chirashi.filter('div', '.salmon') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon"></div>]
 * Chirashi.filter([salmonMaki, tunaMaki, salmonSushi, tunaSushi], '.maki') //returns: [<div class="maki salmon"></div>, <div class="maki tuna"></div>]
 * Chirashi.filter('div', '.salmon') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon"></div>]
 */
export default function filter (elements, tested) {
  return getElements(elements).filter(element => {
    return typeof tested === 'string' && 'matches' in element && element.matches(tested) || element === tested
  })
}
