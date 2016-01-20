import forElements from '../core/for-elements'

export function hide (elements) {
  forElements(elements, (element) => {
    if (!element.style) return

    element.style.visibility = 'hidden'
  })
}

export default hide
