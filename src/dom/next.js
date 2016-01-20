import getElement from '../core/get-element'

export function next (element) {
  element = getElement(element)
  if (!element) return

  return element.nextElementSibling
}

export default next
