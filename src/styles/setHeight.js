import setStyle from './setStyle'

/**
 * Set the provided height to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {(number|string)} height - The height as number or string. For number, unit used will be pixels.
 * @return {Array} domElements - The array of dom elements from elements.
 * @return {function} domElements.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
 * @example //esnext
 * import { append, setHeight } from 'chirashi'
 *
 * append(document.body, '.maki')
 *
 * setHeight('.maki', 20) // returns: [<div class="maki" style="height: 20px;"></div>]
 * setHeight('.maki', '100%') // returns: [<div class="maki" style="height: 100%;"></div>]
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 *
 * Chirashi.setHeight('.maki', 20) // returns: [<div class="maki" style="height: 20px;"></div>]
 * Chirashi.setHeight('.maki', '100%') // returns: [<div class="maki" style="height: 100%;"></div>]
 */
export default function setHeight (elements, height) {
  return setStyle(elements, { height })
}
