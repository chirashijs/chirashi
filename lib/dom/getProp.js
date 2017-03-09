import _getOneOrMoreFromElement from '../_internals/_getOneOrMoreFromElement'

/**
 * Get the value for the property name on the element.
 * @param {(string|Array|NodeList|HTMLCollection|Window|Node)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {string} ...properties - The properties' names.
 * @return {*} value - The value for property on element if only one property, object of property-value pairs or false if no element found.
 * @example //esnext
 * import { createElement, append, getProp } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon')
 * getProp(maki, 'firstChild') //returns: <div class="salmon"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon')
 * Chirashi.getProp(maki, 'firstChild') //returns: <div class="salmon"></div>
 */
const getProp = _getOneOrMoreFromElement.bind(null, _getProperty)
export default getProp

function _getProperty (element, property) {
  return element[property]
}
