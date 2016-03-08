import setProp from './set-prop'
import getProp from './get-prop'

export function prop (elements, option) {
  if (typeof option == 'object') {
    setProp(elements, option)
  }
  else {
    return getProp(elements, option)
  }
}

export default prop
