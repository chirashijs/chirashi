import forEach from '../core/forEach'
import forElements from '../core/forElements'

export default function _applyForEach (elements, method, args) {
  return forElements(elements, element => {
    if (!element[method]) return

    forEach(args, arg => {
      element[method](arg)
    })
  })
}
