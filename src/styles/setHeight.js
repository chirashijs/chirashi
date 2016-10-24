import setStyle from './setStyle'

/**
* Set the provided height to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {number} height - The height
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
export default function setHeight (elements, height) {
  return setStyle(elements, { height })
}
