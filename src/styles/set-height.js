import forElements from '../core/for-elements'

export function setHeight (elements, height) {
  if (typeof height == 'number') height += 'px'

  forElements(elements, (element) => {
    if (!element.style) return

    element.style.height = height
  })
}

export default setHeight
