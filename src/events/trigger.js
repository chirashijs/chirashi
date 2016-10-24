import forEach from '../core/forEach'
import getElements from '../core/getElements'

const defaults = {
  bubbles: true,
  cancelable: true
}

/**
 * Trigger events on elements with data
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} events - The events that should be tiggered seperated with spaces
 * @param {object} data - The events' data
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function trigger (elements, events, options = {}) {
  elements = getElements(elements)

  if (!elements.length) return

  options = { ...options, ...defaults }

  if (typeof events === 'string') events = events.split(/[,\s]+/g)

  forEach(events, event => {
    event = new window.CustomEvent(event, options)

    forEach(elements, element => {
      if (!element.dispatchEvent) return

      element.dispatchEvent(event)
    })
  })

  return elements
}
