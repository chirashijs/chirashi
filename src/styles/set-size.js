import forElements from '../core/for-elements'

export function setSize (elements, object) {
  let width = object.width, height = object.height

  if (typeof width == 'number') width += 'px'
  if (typeof height == 'number') height += 'px'

  forElements(elements, (element) => {
    if (!element.style) return

    element.style.width = width
    element.style.height = height
  })
}

export default setSize
