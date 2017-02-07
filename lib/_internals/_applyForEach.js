import forEach from '../core/forEach'
import forElements from '../core/forElements'

function _applyArg (element, method, arg) {
  element[method](arg)
}

function _applyElement (method, args, element) {
  if (!element[method]) return

  forEach(args, _applyArg.bind(null, element, method))
}

export default function _applyForEach (elements, method, args) {
  return forElements(elements, _applyElement.bind(null, method, args))
}
