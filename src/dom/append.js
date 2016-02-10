import forElements from '../core/for-elements'
import createElement from './create-element'

export function append (elements, node) {
  if (typeof node == 'string') node = createElement(node)

  forElements(elements, (element) => {
    if (!element.appendChild) return

    element.appendChild(node)
  })

  return node
}

export default append
