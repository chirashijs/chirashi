import forElements from '../core/for-elements'

export function removeClass (elements, classes) {
  classes = classes.split(' ')

  forElements(elements, (element) => {
    if (!element.classList) return

    let i = classes.length
    while(i--) element.classList.remove(classes[i])
  })
}

export default removeClass
