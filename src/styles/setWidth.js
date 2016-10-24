import setStyle from './setStyle'

/**
* Set the provided width to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {number} width - The width
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
export default function setWidth (elements, width) {
  return setStyle(elements, { width })
}
