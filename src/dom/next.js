import getProp from './getProp'

/**
 * Get the next sibling of element.
 * @param {string | HTMLElement | SVGElement | Text} element - The selector or dom element.
 * @return {HTMLElement | SVGElement | Text} nextElement - The element's next sibling.
 * @example //esnext
 * import { createElement, append, next } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * next(avocado) //returns: <div class="cheese" data-cheese="cream"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon', [{ 'data-fish': 'salmon' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese'], [{ 'data-cheese': 'cream' }]) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.next(avocado) //returns: <div class="cheese" data-cheese="cream"></div>
 */
export default function next (element) {
  return getProp(element, 'nextElementSibling')
}
