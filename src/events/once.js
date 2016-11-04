import forIn from '../core/forIn'
import on from './on'

/**
 * Bind events listener on each element of elements and unbind after first triggered.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} events - The events that should be bound seperated with spaces
 * @param {eventCallback} callback - The callback used for event binding
 * @return {object} offObject - An object with off method for unbinding
 * @return {object.off} off - off method
 */
export default function once (elements, input) {
  let listener
  const eventsObj = {}

  forIn(input, (events, callback) => {
    eventsObj[events] = event => {
      callback(event)

      listener.off()
    }
  })

  listener = on(elements, eventsObj)

  return {
    cancel: listener.off
  }
}
