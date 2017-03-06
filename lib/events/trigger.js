import _stringToArray from '../_internals/_stringToArray'
import forEach from '../core/forEach'
import getElements from '../core/getElements'

const defaults = {
  bubbles: true,
  cancelable: true
}

/**
 * Trigger events on elements with data
 * @param {(string|Array|NodeList|HTMLCollection|EventTarget)} elements - The iterable, selector or elements.
 * @param {string} events - The events that should be tiggered seperated with spaces
 * @param {Object} data - The events' data
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { createElement, append, on, trigger } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * const listener = on('.cheese, .wasabi', {
 *   click(e, target) => {
 *     console.log('clicked', target)
 *   }
 * })
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * @example //es5
 * var listener = Chirashi.bind('.cheese, .wasabi', {
 *   'click': function (e, target) {
 *     console.log('clicked', target)
 *   }
 * })
 * var maki = Chirashi.createElement('a.cheese.maki')
 * var sushi = Chirashi.createElement('a.wasabi.sushi')
 * Chirashi.append(document.body, [maki, sushi])
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 */
export default function trigger (elements, events, options = {}) {
  elements = getElements(elements)

  if (!elements.length) return

  options = { ...options, ...defaults }

  forEach(_stringToArray(events), _createEvent.bind(null, elements, options))

  return elements
}

function _createEvent (elements, options, event) {
  event = new window.CustomEvent(event, options)

  forEach(elements, _dispatchEvent.bind(null, event))
}

function _dispatchEvent (event, element) {
  element.dispatchEvent(event)
}
