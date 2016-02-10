import forElements from '../core/for-elements'
import off from './off'

export function unhover (elements, enter, leave) {
  forElements(elements, (element) => {
    if (enter) off(element, 'mouseenter', enter)
    if (leave) off(element, 'mouseleave', leave)
  })
}

export default unhover
