import forElements from '../core/forElements'
import remove from './remove'

function _emptyElement (element) {
  remove(element.children)
}

export default function empty (elements) {
  return forElements(elements, _emptyElement)
}
