import setHeight from './set-height'
import getHeight from './get-height'

export function height (elements, height) {
  if (typeof height != 'undefined') {
    setHeight(elements, height)
  }
  else {
    return getHeight(elements)
  }
}

export default height
