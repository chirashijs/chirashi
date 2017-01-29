import forEach from '../core/forEach'

const _breakingMethods = ['push', 'splice', 'unshift']

export default function _chirasizeArray (array) {
  forEach(_breakingMethods, method => {
    array[method] = function () {
      this['_chrsh-valid'] = false

      return Array.prototype[method].apply(this, arguments)
    }
  })

  array['_chrsh-valid'] = true

  return array
}
