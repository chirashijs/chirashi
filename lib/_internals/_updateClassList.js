import forElements from '../core/forElements'

export default function _updateClassList (elements, method, classes) {
  return forElements(elements, element => {
    if (!element.classList) return

    element.classList[method].apply(element.classList, classes)
  })
}
