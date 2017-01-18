import forEach from './forEach'

/**
 * Iterates over object's keys and apply callback on each one.
 * @param {Object} object - The iterable.
 * @param {forInCallback} callback - The function to call for each key-value pair.
 * @param {boolean} [forceOrder=false] - Respect keys order.
 * @return {Object} object - The iterable for chaining.
 * @example //esnext
 * import { forIn } from 'chirashi'
 * const californiaRoll = { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * forIn(californiaRoll, (key, value) => {
 *   console.log(`${key} -> ${value}`)
 * }) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * // LOGS:
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 * // price -> 4.25
 * // name -> California Roll
 * forIn(californiaRoll, (key, value) => {
 *   console.log(`${key} -> ${value}`)
 * }, true) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * // LOGS:
 * // name -> California Roll
 * // price -> 4.25
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 * @example //es5
 * var californiaRoll = { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * Chirashi.forIn(californiaRoll, (key, value) => {
 *   console.log(key + ' -> ' + value)
 * }) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * // LOGS:
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 * // price -> 4.25
 * // name -> California Roll
 * Chirashi.forIn(californiaRoll, (key, value) => {
 *   console.log(key + ' -> ' + value)
 * }, true) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * // LOGS:
 * // name -> California Roll
 * // price -> 4.25
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 */
export default function forIn (object, callback, forceOrder = false) {
  if (typeof object !== 'object') return

  forEach(Object.keys(object), key => callback(key, object[key]), forceOrder)

  return object
}

/**
 * Callback to apply on each key-value pair.
 * @callback forInCallback
 * @param {string} key
 * @param {*} value
 */
