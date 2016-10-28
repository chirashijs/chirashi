import forElements from '../core/forElements'
import _stringToArray from './_stringToArray'

export default function _updateClassList (elements, method, classes) {
  classes = _stringToArray(classes)

  return forElements(elements, element => {
    if (!element.classList[method]) return

    element.classList[method](...classes)
  })
}
