import _chirasizeArray from '../_internals/_chirasizeArray'
import forElements from '../core/forElements'

export default function _applyOnElements (method, elements, selector) {
  let found = []

  forElements(elements, method.bind(null, found, selector))

  return _chirasizeArray(found)
}
