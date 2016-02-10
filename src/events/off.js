import forElements from '../core/for-elements'

export function off (elements, events, callback) {
  events = events.split(' ')

  forElements(elements, (element) => {
    if (!element.removeEventListener) return

    let i = events.length
    while(i--) element.removeEventListener(events[i], callback)
  })
}

export default off
