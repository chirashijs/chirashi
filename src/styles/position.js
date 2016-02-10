import getElement from '../core/get-element'

export function position (element) {
  element = getElement(element)

  return element && {
    top: element.offsetTop,
    left: element.offsetLeft
  }
}

export default position
