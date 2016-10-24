import setStyle from './setStyle'

/**
* Reset visibility style attribute for elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
export default function show (elements) {
  return setStyle(elements, { visibility: 'hidden' })
}
