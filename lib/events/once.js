import forIn from '../core/forIn'
import on from './on'

/**
 * Bind events listener on each element of elements and unbind after first triggered.
 * @param {(string|Array|NodeList|HTMLCollection|EventTarget)} elements - The iterable, selector or elements.
 * @param {Object.<string, eventCallback>} input - An object in which keys are events to bind seperated with coma and/or spaces and values are eventCallbacks.
 * @param {boolean} [eachElement=false] - If true only current target's events listeners will be removed after trigger.
 * @param {boolean} [eachEvent=false] - If true only triggered event group of events listeners will be removed.
 * @return {Object} cancelObject - An object with cancel method for unbinding.
 * @return {Object.cancel} cancel - cancel method.
 * @example //esnext
 * import { createElement, append, once, trigger } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * const listener = once('.cheese, .wasabi', {
 *   click(e, target) => {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': (e, target) => {
 *     console.log('mouse in', target)
 *   }
 * }, true, true)
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * // click event listener was auto-removed from maki
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * // click event listener was auto-removed from sushi
 * listener.cancel() //remove all listeners from all elements
 * const listener2 = once('.cheese, .wasabi', {
 *   click(e, target) => {
 *     console.log('clicked', target)
 *   }
 * })
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * // all events listeners were auto-removed from all elements
 * trigger(sushi, 'click') //simulate user's click
 * // won't log anything
 * @example //es5
 * var maki = Chirashi.createElement('a.cheese.maki')
 * var sushi = Chirashi.createElement('a.wasabi.sushi')
 * Chirashi.append(document.body, [maki, sushi])
 * var listener = Chirashi.once('.cheese, .wasabi', {
 *   click: function (e, target) {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': function (e, target) {
 *     console.log('mouse in', target)
 *   }
 * }, true, true)
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * // click event listener was auto-removed from maki
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * // click event listener was auto-removed from sushi
 * listener.cancel() //remove all listeners from all elements
 * var listener2 = Chirashi.once('.cheese, .wasabi', {
 *   click: function (e, target) {
 *     console.log('clicked', target)
 *   }
 * })
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * // all events listeners were auto-removed from all elements
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // won't log anything
 */
export default function once (elements, input, eachElement = false, eachEvent = false) {
  let listener
  const eventsObj = {}

  forIn(input, (events, callback) => {
    eventsObj[events] = event => {
      callback(event)

      listener.off(eachElement && event.currentTarget, eachEvent && events)
    }
  })

  listener = on(elements, eventsObj)

  return {
    cancel: listener.off
  }
}
