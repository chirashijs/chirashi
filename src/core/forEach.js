/**
* Iterates over items and apply callback on each one.
* @param {*} items - The iterable.
* @param {forEachCallback} callback - The callback to call for each iteratee.
* @param {bool} [forceOrder=false] - Respect items order.
* @return {Array} items for chaining.
* @example //esnext
* import { forEach } from 'chirashi'
*
* const items = forEach([0, 1, 2], (item, i) => console.log(`${i}: ${item + 1}`)) //returns: [0, 1, 2]
* // logs:
* //   2: 3
* //   1: 2
* //   0: 1
* forEach(items, (item, i) => console.log(`${i}: ${item + 1}`), true) //returns: [0, 1, 2]
* // logs:
* //   0: 1
* //   1: 2
* //   2: 3
* forEach(0, (item, i) => console.log(`${i}: ${item + 1}`)) //returns: [0]
* //   0: 1
* @example //es5
* var items = Chirashi.forEach([0, 1, 2], function (item, i) { console.log(i+': '+(item + 1)) }) //returns: [0, 1, 2]
* // logs:
* //   2: 3
* //   1: 2
* //   0: 1
* Chirashi.forEach(items, function (item, i) { console.log(i+': '+(item + 1)) }, true) //returns: [0, 1, 2]
* // logs:
* //   0: 1
* //   1: 2
* //   2: 3
* Chirashi.forEach(0, function (item, i) { console.log(i+': '+(item + 1)) }) //returns: [0]
* // logs:
* //   0: 1
*/
export default function forEach (items, callback, forceOrder = false) {
  if (!items) return []

  if (!(items instanceof Array)) {
    if (!(items instanceof window.NodeList || items instanceof window.HTMLCollection)) {
      items = [items]
    }
  }

  if (!forceOrder) {
    let i = items.length
    while (i--) callback(items[i], i)
  } else {
    let i = -1
    let len = items.length
    while (++i < len) {
      callback(items[i], i)
    }
  }

  return items
}

/**
* Callback to apply on item.
* @callback forEachCallback
* @param {*} item
* @param {number} index - Index of item in items.
*/
