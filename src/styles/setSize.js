import setStyle from './setStyle'

/**
* Set the provided size to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector.
* @param {number} width - The width value.
* @param {number} height - The height value.
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining.
*/
export default function setSize (elements, width, height) {
  return setStyle(elements, { width, height })
}
