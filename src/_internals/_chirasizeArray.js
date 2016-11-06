import forEach from '../core/forEach'
import getElements from '../core/getElements'

const _breakingMethods = ['push', 'splice', 'unshift']

export default function _chirasizeArray (array) {
  array.chrshPush = function (input) {
    this.push(...getElements(input))
    this['_chrsh-valid'] = true

    return this
  }

  forEach(_breakingMethods, method => {
    array[method] = function () {
      this['_chrsh-valid'] = false

      return Array.prototype[method].apply(this, arguments)
    }
  })

  array['_chrsh-valid'] = true

  return array
}
