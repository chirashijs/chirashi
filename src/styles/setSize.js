import setStyle from './setStyle'

/**
* Set the provided size to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} size - The size as an object with width and height
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
export default function setSize (elements, width, height) {
  return setStyle(elements, { width, height })
}
