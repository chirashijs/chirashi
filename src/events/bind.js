import forIn from '../core/forIn'
import on from './on'
import off from './off'
import closest from '../dom/closest'

/**
 * Bind events listener on delegate and execute callback when target matches selector (targets doesn't have to be in the DOM at binding).
 * @param {string} selector - The selector to match.
 * @param {string | Array} events - Array of events to listen or string of events seperated with comma and/or spaces.
 * @param {bindCallback} callback - The callback to execute when one event is triggered.
 * @return {Object} object - An object with unbind method for unbinding.
 * @return {function} object.unbind - The unbind method.
 * @example //esnext
 * import { createElement, append, bind, trigger } from 'chirashi'
 * const listener = bind('.cheese, .wasabi', {
 *   'click': (e, target) => {
 *     console.log('clicked', target)
 *   }
 * })
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.unbind() //remove listeners
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
 * listener.unbind() //remove listeners
 */
export default function bind (selector, input, delegate = document.body) {
  const eventsObj = {}
  forIn(input, (events, callback) => {
    eventsObj[events] = event => {
      const target = closest(event.target, selector, delegate)
      if (target) callback(event, target)
    }
  })

  on(delegate, eventsObj)

  return {
    unbind () {
      off(delegate, eventsObj)
    }
  }
}

/**
* Callback to execute on event.
* @callback bindCallback
* @param {object} event - Triggered event.
* @param {HTMLElement | SVGElement} target - Target of the event.
*/
