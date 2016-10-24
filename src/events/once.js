import on from './on'
import off from './off'

/**
 * Bind events listener on each element of elements and unbind after first triggered.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} events - The events that should be bound seperated with spaces
 * @param {function} callback - The callback used for event binding
 * @return {object} offObject - An object with off method for unbinding
 * @return {object.off} off - off method
 */
export default function once (elements, events, callback) {
  const innerCallback = (event) => {
    callback(event)

    off(elements, events, innerCallback)
  }

  on(elements, events, innerCallback)

  return {
    cancel () {
      off(elements, events, innerCallback)
    }
  }
}
