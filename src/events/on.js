import _setEvents from '../internals/_setEvents'

/**
 * Bind events listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {string | Array} events - Array of events to listen or string of events seperated with comma and/or spaces.
 * @param {eventCallback} callback - The callback used for event binding.
 * @return {Array} elements - The iterable for chaining.
 */
export default function on (elements, input) {
  return _setEvents(elements, 'add', input)
}

/**
* Callback to execute on event.
* @callback eventCallback
* @param {Event} event - Triggered event.
*/
