import forElements from '../core/for-elements'

export function on (elements, events, callback) {
  events = events.split(' ')

  forElements(elements, element => {
    if (!element.addEventListener) return

    let i = events.length
    while(i--) element.addEventListener(events[i], callback)
  })
}

export default on
