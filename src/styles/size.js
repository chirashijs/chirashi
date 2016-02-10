import setSize from './set-size'
import getSize from './get-size'

export function size (elements, object) {
  if (typeof object != 'object') {
    return getSize(elements)
  }
  else {
    setSize(elements, object)
  }
}

export default size
