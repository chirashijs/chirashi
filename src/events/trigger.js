import _stringToArray from '../internals/_stringToArray'
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

  forEach(_stringToArray(events), event => {
    event = new window.CustomEvent(event, options)

    forEach(elements, element => element.dispatchEvent(event))
  })

  return elements
}
