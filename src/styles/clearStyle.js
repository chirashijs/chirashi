import _stringToArray from '../internals/_stringToArray'
import forEach from '../core/forEach'
import setStyle from './setStyle'

/**
* Set the provided style to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} style - The style options as object linking value to property
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
export default function clearStyle (elements, props) {
  props = _stringToArray(props)

  const style = {}
  forEach(props, prop => {
    style[prop] = ''
  })

  return setStyle(elements, style)
}
