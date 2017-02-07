import forElements from '../core/forElements'

function _updateOne (method, classes, element) {
  element.classList[method].apply(element.classList, classes)
}

export default function _updateClassList (elements, method, classes) {
  return forElements(elements, _updateOne.bind(null, method, classes))
}
