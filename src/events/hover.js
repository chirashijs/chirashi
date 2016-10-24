import on from './on'
import off from './off'

/**
 * Bind hover listener on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {bindCallback} callback - The callback to execute when one event is triggered.
 * @param {function} enter - The enter callback.
 * @param {function} leave - The leave callback.
 * @return {Object} object - An object with off method for unbinding.
 * @return {function} object.off - The off method.
 */
export default function hover (elements, enter, leave) {
  const events = {
    mouseenter: enter,
    mouseleave: leave
  }

  on(elements, events)

  return {
    off () {
      off(elements, events)
    }
  }
}

/**
* Callback to execute on event.
* @callback bindCallback
* @param {object} event - Triggered event.
* @param {HTMLElement | SVGElement} target - Target of the event.
*/
