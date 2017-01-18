import getProp from './getProp'

/**
 * Returns the parent node of the element.
 * @param {(string|document|HTMLElement|SVGElement|Text)} element - The selector or dom element.
 * @return {(document|HTMLElement|SVGElement|null)} parentElement - The parent node or null if no element found.
 * @example //esnext
 * import { createElement, append, parent } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * parent('.salmon') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * append(maki
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * Chirashi.parent('.salmon') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 */
export default function parent (element) {
  return getProp(element, 'parentNode')
}
