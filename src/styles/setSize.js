import setStyle from './setStyle'

/**
 * Set the provided size to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {(number|string)} width - The width as number or string. For number, unit used will be pixels.
 * @param {(number|string)} height - The height as number or string. For number, unit used will be pixels.
 * @return {Array} domElements - The array of dom elements from elements.
 * @return {function} domElements.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
 * @example //esnext
 * import { append, setSize } from 'chirashi'
 *
 * append(document.body, '.maki')
 *
 * setSize('.maki', 20, '100%') // returns: [<div class="maki" style="width: 20px; height: 100%;"></div>]
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 *
 * Chirashi.setSize('.maki', 20, '100%') // returns: [<div class="maki" style="width: 20px; height: 100%;"></div>]
 */
export default function setSize (elements, width, height) {
  return setStyle(elements, { width, height })
}
