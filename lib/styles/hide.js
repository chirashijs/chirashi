 import setStyleProp from './setStyleProp'

/**
 * Hide each element of elements using visibility.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement)} elements - The iterable, selector or elements.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { append, hide, getStyleProp }
 * append(document.body, '.maki')
 * const maki = hide('.maki')
 * getStyleProp(maki, 'visibility') // returns: "hidden"
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.hide('.maki')
 * Chirashi.getStyleProp(maki, 'visibility') // returns: "hidden"
 */
export default function hide (elements) {
  return setStyleProp(elements, { visibility: 'hidden' })
}
