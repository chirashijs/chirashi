import setWidth from './set-width'
import getWidth from './get-width'

export function width (elements, width) {
  if (typeof width != 'undefined') {
    setWidth(elements, width)
  }
  else {
    return getWidth(elements)
  }
}

export default width
