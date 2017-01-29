import _setEvents from '../_internals/_setEvents'

/**
 * Bind events listener on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {Object.<string, eventCallback>} input - An object in which keys are events to bind seperated with coma and/or spaces and values are eventCallbacks.
 * @return {Object} object - An object with off method to remove events listeners.
 * @return {offCallback} object.off - The off method.
 * @example //esnext
 * import { createElement, append, on, trigger } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * const listener = on('.cheese, .wasabi', {
 *   click(e, target) {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': (e, target) => {
 *     console.log('mouse in', target)
 *   }
 * })
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.off(maki, 'click') //remove click event listener on maki
 * listener.off() //remove all listeners from all elements
 * @example //es5
 * var listener = Chirashi.bind('.cheese, .wasabi', {
 *   'click': function (e, target) {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': function(e, target) {
 *     console.log('mouse in', target)
 *   }
 * })
 * var maki = Chirashi.createElement('a.cheese.maki')
 * var sushi = Chirashi.createElement('a.wasabi.sushi')
 * Chirashi.append(document.body, [maki, sushi])
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.off(maki, 'click') //remove click event listener on maki
 * listener.off() //remove all listeners from all elements
 */
export default function on (elements, input) {
  elements = _setEvents(elements, 'add', input)

  return {
    off (offElements, events) {
      _setEvents(offElements || elements, 'remove', events ? { [events]: input[events] } : input)
    }
  }
}

/**
* Callback to execute on event.
* @callback eventCallback
* @param {Event} event - Triggered event.
*/

/**
* Called to remove one or all events listeners of one or all elements.
* @callback offCallback
* @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement)} [offElements] - The iterable, selector or elements to unbind.
* @param {string} [events] - The events to unbind. Must be provided in the same syntax as in input.
*/
