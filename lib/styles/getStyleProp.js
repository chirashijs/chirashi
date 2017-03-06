import forEach from '../core/forEach'
import getComputedStyle from './getComputedStyle'

/**
 * Get computed style props of an element. While getComputedStyle returns all properties, getStyleProp returns only needed and convert unitless numeric values or pixels values into numbers.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(string|number|Object<string, (string|number)>)} computedStyle - Value of computed for provided prop if only one or parsed copy of element's computed style if several.
 * @example //esnext
 * import { append, setStyleProp, getStyleProp } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyleProp('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * getStyleProp(maki, 'display', 'top') //returns: { display: "block", top: 10 }
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyleProp('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * Chirashi.getStyleProp(maki, 'display', 'top') //returns: { display: "block", top: 10 }
 */
export default function getStyleProp (element, ...props) {
  const computedStyle = getComputedStyle(element)

  if (!computedStyle) return false

  if (props.length === 1) {
    return _parseProp(computedStyle, props[0])
  } else {
    const style = {}
    forEach(props, _parsePropInto.bind(null, style, computedStyle))

    return style
  }
}

function _parsePropInto(output, input, prop) {
  output[prop] = _parseProp(input, prop)
}

function _parseProp (input, prop) {
  const value = input[prop]
  return value && (!isNaN(+value) || value.indexOf('px') !== -1) ? parseFloat(value) : value
}
