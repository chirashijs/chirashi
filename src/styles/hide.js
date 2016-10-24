import setStyle from './setStyle'

/**
 * Hide each element of elements using visibility.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @return {string | Array | NodeList | HTMLCollection} elements for chaining
 */
export default function hide (elements) {
  return setStyle(elements, { visibility: 'hidden' })
}
