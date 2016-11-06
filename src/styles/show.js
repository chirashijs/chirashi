import setStyle from './setStyle'

/**
 * Show each element of elements using visibility.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @return {Array} domElements - The array of dom elements from elements.
 * @return {function} domElements.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
 * @example //esnext
 * import { append, show, getStyle }
 * append(document.body, '.maki')
 * const maki = show('.maki')
 * getStyle(maki, 'visibility') // returns: "hidden"
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.show('.maki')
 * Chirashi.getStyle(maki, 'visibility') // returns: "visible"
 */
export default function show (elements) {
  return setStyle(elements, { visibility: 'visible' })
}
