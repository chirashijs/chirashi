import forEach from '../core/forEach'
import forElements from '../core/forElements'
import forIn from '../core/forIn'

/**
 * Bind events listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {string | Array} events - Array of events to listen or string of events seperated with comma and/or spaces.
 * @param {eventCallback} callback - The callback used for event binding.
 * @return {Array} elements - The iterable for chaining.
 */
export default function on (elements, input) {
  return forElements(elements, element => {
    if (!element.addEventListener) return

    forIn(input, (events, callback) => {
      forEach(events.split(/[,\s]+/g), event => element.addEventListener(event, callback))
    })
  })
}

/**
* Callback to execute on event.
* @callback eventCallback
* @param {Event} event - Triggered event.
*/
