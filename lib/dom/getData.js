import _getOneOrMoreFromElement from '../_internals/_getOneOrMoreFromElement'

/**
 * Alias on getAttr prefixing name with 'data-'.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {...string} names - The data-attributes' names.
 * @return {(Object<string, (string|boolean)>|string|boolean)} value - The value for the data-attribute if only one name, object of data-attributes' name-value pairs or false if no element found.
 * @example //esnext
 * import { createElement, getData } from 'chirashi'
 * const maki = createElement('.maki[data-fish="salmon"]')
 * getData(maki, 'fish') //returns: "salmon"
 * @example //es5
 * const maki = Chirashi.createElement('.maki[data-fish="salmon"]')
 * Chirashi.getData(maki, 'fish') //returns: "salmon"
 */
const getData = _getOneOrMoreFromElement.bind(null, _getDataAttribute)
export default getData

function _getDataAttribute (element, name) {
  return element.getAttribute('data-' + name)
}
