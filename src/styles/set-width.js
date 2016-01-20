import forElements from '../core/for-elements'

export function setWidth (elements, width) {
  if (typeof width == 'number') width += 'px'

  forElements(elements, (element) => {
    if (!element.style) return

    element.style.width = width
  })
}

export default setWidth
