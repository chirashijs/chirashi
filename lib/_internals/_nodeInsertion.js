import forEach from '../core/forEach'
import getElement from '../core/getElement'

export default function _nodeInsertion (method, element, nodes) {
  element = getElement(element)

  if (!element || !('parentNode' in element)) return

  const parent = element.parentNode

  forEach(nodes, method.bind(null, parent, element))

  return element
}
