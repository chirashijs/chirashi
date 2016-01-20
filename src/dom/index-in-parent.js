import getElement from '../core/get-element'

export function indexInParent (element) {
  element = getElement(element)
  if (!element) return

  let currentElement = element,
      parent = element.parentNode,
      i = 0

  while (currentElement.previousElementSibling) {
      ++i
      currentElement = currentElement.previousElementSibling
  }

  return element === parent.children[i] ? i : -1
}

export default indexInParent
