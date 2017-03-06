import forIn from '../core/forIn'
import getElement from '../core/getElement'
import on from './on'
import closest from '../dom/closest'

/**
 * Delegate events listener on delegate and execute callback when target matches selector (targets doesn't have to be in the DOM).
 * @param {string} selector - The selector to match.
 * @param {Object.<string, delegateCallback>} input - An object in which keys are events to delegate seperated with coma and/or spaces and values are delegateCallbacks.
 * @param {(string|Array|NodeList|HTMLCollection|EventTarget)} [target=document.body] - The event target. Note that it'll be passed to getElement to ensure there's only one.
 * @return {Object} object - An object with off method for offing.
 * @return {offCallback} object.off - The off method.
 * @example //esnext
 * import { createElement, append, delegate, trigger } from 'chirashi'
 * const listener = delegate('.cheese, .wasabi', {
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
 * listener.off('mouseenter mousemove') //remove mouseenter and mousemove listeners
 * listener.off() //remove all listeners
 * @example //es5
 * var listener = Chirashi.delegate('.cheese, .wasabi', {
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
 * listener.off('mouseenter mousemove') //remove mouseenter and mousemove listeners
 * listener.off() //remove all listeners
 */
export default function delegate (selector, input, target = document.body) {
  target = getElement(target)

  const eventsObj = {}
  forIn(input, _wrapOptions.bind(null, selector, target, eventsObj))

  const bound = on(target, eventsObj)

  return {
    off (events) {
      bound.off(target, events)
    }
  }
}

function _wrapOptions (selector, target, eventsObj, events, options) {
  if (typeof options === 'function') {
    eventsObj[events] = _wrapCallback(selector, target, options)
  } else {
    eventsObj[events] = {
      ...options,
      handler: _wrapCallback(selector, target, options.handler)
    }
  }
}

function _wrapCallback (selector, target, callback) {
  return function (event) {
    const currentTarget = closest(event.target, selector, target)
    if (currentTarget) callback(event, currentTarget)
  }
}

/**
* Callback to execute on event using delegate.
* @callback delegateCallback
* @param {Event} event - Triggered event.
* @param {HTMLElement | SVGElement} target - Target of the event.
*/

/**
* Called to off one or all events.
* @callback offCallback
* @param {string} [events] - The events to off. Must be provided in the same syntax as in input.
*/
