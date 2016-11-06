import forIn from '../core/forIn'
import on from './on'
import closest from '../dom/closest'

/**
 * Bind events listener on delegate and execute callback when target matches selector (targets doesn't have to be in the DOM at binding).
 * @param {string} selector - The selector to match.
 * @param {Object.<string, bindCallback>} input - An object in which keys are events to bind seperated with coma and/or spaces and values are bindCallbacks.
 * @return {Object} object - An object with unbind method for unbinding.
 * @return {unbindCallback} object.unbind - The unbind method.
 * @example //esnext
 * import { createElement, append, bind, trigger } from 'chirashi'
 * const listener = bind('.cheese, .wasabi', {
 *   click(e, target) => {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': (e, target) => {
 *     console.log('mouse in', target)
 *   }
 * })
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.unbind('mouseenter mousemove') //remove mouseenter and mousemove listeners
 * listener.unbind() //remove all listeners
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
 * listener.unbind('mouseenter mousemove') //remove mouseenter and mousemove listeners
 * listener.unbind() //remove all listeners
 */
export default function bind (selector, input, delegate = document.body) {
  const eventsObj = {}
  forIn(input, (events, callback) => {
    eventsObj[events] = event => {
      const target = closest(event.target, selector, delegate)
      if (target) callback(event, target)
    }
  })

  const bound = on(delegate, eventsObj)

  return {
    unbind (events) {
      bound.off(delegate, events)
    }
  }
}

/**
* Callback to execute on event using delegate.
* @callback bindCallback
* @param {Event} event - Triggered event.
* @param {HTMLElement | SVGElement} target - Target of the event.
*/

/**
* Called to unbind one or all events.
* @callback unbindCallback
* @param {string} [events] - The events to unbind. Must be provided in the same syntax as in input.
*/
