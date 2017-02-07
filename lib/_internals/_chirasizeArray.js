import forEach from '../core/forEach'

const _breakingMethods = ['push', 'splice', 'unshift']

function _overloadMethod (array, method) {
  array[method] = function () {
    this['_chrsh-valid'] = false

    return Array.prototype[method].apply(this, arguments)
  }
}

export default function _chirasizeArray (array) {
  forEach(_breakingMethods, _overloadMethod.bind(null, array))

  array['_chrsh-valid'] = true

  return array
}
