import getProp from './getProp'

/**
 * Get the next sibling of element.
 * @param {(string|Array|NodeList|HTMLCollection|NonDocumentTypeChildNode)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(Node|null)} nextElement - The element's next sibling or null if no element found.
 * @example //esnext
 * import { createElement, append, next } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * next(avocado) //returns: <div class="cheese" data-cheese="cream"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.next(avocado) //returns: <div class="cheese" data-cheese="cream"></div>
 */
export default function next (element) {
  return getProp(element, 'nextElementSibling')
}
