import setStyle from './set-style'
import getStyle from './get-style'

/**
 * Get style value for option property of element or first element of elements if option is a string,
 * set style values for properties to all element of elements if option is an object.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string | object} option - The css property name or an object | property-value pairs
 * @return {object | string | Array | NodeList | HTMLCollection} value | elements - The css value for the property | elements for chaining
 */
export default function style (elements, option) {
  if (typeof option == 'object') {
    return setStyle(elements, option)
  }
  else if (typeof option == 'string') {
    return getStyle(elements, option)
  }
}
