/**
 * Iterates over items and apply callback on each one.
 * @param {*} items - The iterable.
 * @param {forEachCallback} callback - The callback to call for each iteratee.
 * @return {(Array|NodeList|HTMLCollection)} iterable - items for chaining.
 * @example //esnext
 * import { forEach } from 'chirashi'
 *
 * const items = forEach([0, 1, 2], (item, i) => console.log(`${i}: ${item + 1}`)) //returns: [0, 1, 2]
 * // logs:
 * //   0: 1
 * //   1: 2
 * //   2: 3
 * forEach(0, (item, i) => console.log(`${i}: ${item + 1}`)) //returns: [0]
 * //   0: 1
 * @example //es5
 * var items = Chirashi.forEach([0, 1, 2], function (item, i) { console.log(i+': '+(item + 1)) }) //returns: [0, 1, 2]
 * // logs:
 * //   0: 1
 * //   1: 2
 * //   2: 3
 * Chirashi.forEach(0, function (item, i) { console.log(i+': '+(item + 1)) }) //returns: [0]
 * // logs:
 * //   0: 1
 */
export default function forEach (items, callback) {
  if (!items) return []

  if (typeof items !== 'object' || !('length' in items)) {
    items = [items]
  }

  const n = items.length
  for (let i = 0; i < n; ++i) callback(items[i], i)

  return items
}

/**
* Callback to apply on item.
* @callback forEachCallback
* @param {*} item
* @param {number} index - Index of item in items.
*/
