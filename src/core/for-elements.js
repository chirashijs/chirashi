import forEach from './for-each'
import { getElements } from './get-elements'

export function forElements (elements, callback, forceOrder = false) {
  forEach(getElements(elements), callback, forceOrder)
}

export default forElements
