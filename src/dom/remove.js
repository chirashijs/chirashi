import forElements from '../core/for-elements'

export function remove (elements) {
  forElements(elements, (element) => {
    if (!element.parentNode) return

    element.parentNode.removeChild(element)
  })
}

export default remove
