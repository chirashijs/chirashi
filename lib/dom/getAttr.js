import _getOneOrMoreFromElement from '../_internals/_getOneOrMoreFromElement'

/**
 * Get value for named attribute of element.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {...string} names - The attributes' names.
 * @return {(Object<string, (string|boolean)>|string|boolean)} value - The value for the attribute if only one name, object of attributes' name-value pairs or false if no element found.
 * @example //esnext
 * import { createElement, getAttr } from 'chirashi'
 * const maki = createElement('.maki[data-fish="salmon"]')
 * getAttr(maki, 'data-fish') //returns: "salmon"
 * @example //es5
 * const maki = Chirashi.createElement('.maki[data-fish="salmon"]')
 * Chirashi.getAttr(maki, 'data-fish') //returns: "salmon"
 */
const getAttr = _getOneOrMoreFromElement.bind(null, _getAttribute)
export default getAttr

function _getAttribute (element, name) {
  return element.getAttribute(name)
}
