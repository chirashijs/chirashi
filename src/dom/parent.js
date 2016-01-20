import getElement from '../core/get-element'

export function parent (element, selector) {
  element = getElement(element)

  return element && element.parentNode
}

export default parent
