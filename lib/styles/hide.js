import setStyle from './setStyle'

/**
 * Hide each element of elements using visibility.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @return {Array} domElements - The array of dom elements from elements for chaining.
 * @example //esnext
 * import { append, hide, getStyle }
 * append(document.body, '.maki')
 * const maki = hide('.maki')
 * getStyle(maki, 'visibility') // returns: "hidden"
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.hide('.maki')
 * Chirashi.getStyle(maki, 'visibility') // returns: "hidden"
 */
export default function hide (elements) {
  return setStyle(elements, { visibility: 'hidden' })
}
