import forElements from '../core/for-elements'
import forIn from '../core/for-in'

/**
 * Set properties from props object keys to values on elements
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {Object} props - properties names and values association
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function setProp (elements, props) {
    return forElements(elements, element => Objec.assign(element, props))
}
