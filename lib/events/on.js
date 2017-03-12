import _setEvents from '../_internals/_setEvents'

/**
 * Bind events listener on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|EventTarget)} elements - The iterable, selector or elements.
 * @param {Object.<string, (eventCallback|EventObject)>} input - An object in which keys are events to bind seperated with coma and/or spaces and values are eventCallbacks or EventObjects.
 * @return {offCallback} off - The unbinding function.
 * @example //esnext
 * import { createElement, append, on, trigger } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * const off = on('.cheese, .wasabi', {
 *   click(e, target) {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': {
 *     handler: (e, target) => {
 *       console.log('mouse in', target)
 *     },
 *     passive: true
 *   }
 * })
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * off(maki, 'click') //remove click event listener on maki
 * off() //remove all listeners from all elements
 * @example //es5
 * var off = Chirashi.bind('.cheese, .wasabi', {
 *   'click': function (e, target) {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': {
 *     handler: (e, target) => {
 *       console.log('mouse in', target)
 *     },
 *     passive: true
 *   }
 * })
 * var maki = Chirashi.createElement('a.cheese.maki')
 * var sushi = Chirashi.createElement('a.wasabi.sushi')
 * Chirashi.append(document.body, [maki, sushi])
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * off(maki, 'click') //remove click event listener on maki
 * off() //remove all listeners from all elements
 */
export default function on (elements, input) {
  elements = _setEvents(elements, 'add', input)

  return function (offElements, events) {
    _setEvents(offElements || elements, 'remove', events ? { [events]: input[events] } : input)
  }
}

/**
 * Options to bind event.
 * @typedef {Object} EventObject
 * @property {eventCallback} handler - The callback to execute on event.
 * @property {boolean} [capture=false] - Indicates that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
 * @property {boolean} [once=false] - Indicates that the listener should be invoked at most once after being added. If it is true, the listener would be removed automatically when it is invoked.
 * @property {boolean} [passive=false] - Indicates that the listener will never call preventDefault(). If it does, the user agent should ignore it and generate a console warning.
 */

/**
 * Callback to execute on event.
 * @callback eventCallback
 * @param {Event} event - Triggered event.
 */

/**
 * Called to remove one or all events listeners of one or all elements.
 * @callback offCallback
 * @param {(string|Array|NodeList|HTMLCollection|EventTarget)} [offElements] - The iterable, selector or elements to unbind.
 * @param {string} [events] - The events to unbind. Must be provided in the same syntax as in input.
 */
