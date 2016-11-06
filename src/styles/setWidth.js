import setStyle from './setStyle'

/**
 * Set the provided width to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {(number|string)} width - The width as number or string. For number, unit used will be pixels.
 * @return {Array} domElements - The array of dom elements from elements.
 * @return {function} domElements.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
 * @example //esnext
 * import { append, setWidth } from 'chirashi'
 *
 * append(document.body, '.maki')
 *
 * setWidth('.maki', 20) // returns: [<div class="maki" style="width: 20px;"></div>]
 * setWidth('.maki', '100%') // returns: [<div class="maki" style="width: 100%;"></div>]
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 *
 * Chirashi.setWidth('.maki', 20) // returns: [<div class="maki" style="width: 20px;"></div>]
 * Chirashi.setWidth('.maki', '100%') // returns: [<div class="maki" style="width: 100%;"></div>]
 */
export default function setWidth (elements, width) {
  return setStyle(elements, { width })
}
