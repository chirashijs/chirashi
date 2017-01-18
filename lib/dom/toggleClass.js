import forEach from '../core/forEach'
import forElements from '../core/forElements'
import forIn from '../core/forIn'
import _stringToArray from '../_internals/_stringToArray'

/**
 * Iterates over classes and toggle it on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement|Text)} elements - The iterable, selector or elements.
 * @param {(string|Array|Object)} classes - Array of classes or string of classes seperated with comma and/or spaces. Or object with keys being the string of classes seperated with comma and/or spaces and values function returning a booleanean.
 * @return {Array} domElements - The removed elements.
 * @return {function} domElements.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
 * @example //esnext
 * import { createElement, toggleClass, clone, setData, getData } from 'chirashi'
 * const maki = createElement('.wasabi.salmon.maki') //returns: <div class="maki salmon wasabi"></div>
 * const sushi = createElement('.salmon.sushi') //returns: <div class="sushi salmon"></div>
 * toggleClass([maki, sushi], 'wasabi') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon wasabi"></div>]
 * const scdMaki = clone(maki)
 * setData(maki, { for: 'leonard' })
 * setData(scdMaki, { for: 'sheldon' })
 * toggleClass([maki, scdMaki], {
 *   cheese: element => {
 *     return getData(element, 'for') !== 'leonard'
 *   }
 * }) //returns: [<div class="maki salmon cheese" data-for="sheldon"></div>, <div class="maki salmon" data-for="leonard"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.wasabi.salmon.maki') //returns: <div class="wasabi salmon maki"></div>
 * var sushi = Chirashi.createElement('.salmon.sushi') //returns: <div class="salmon sushi"></div>
 * Chirashi.toggleClass([maki, sushi], 'wasabi') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon wasabi"></div>]
 * var scdMaki = Chirashi.clone(maki)
 * Chirashi.setData(maki, { for: 'leonard' })
 * Chirashi.setData(scdMaki, { for: 'sheldon' })
 * Chirashi.toggleClass([maki, scdMaki], {
 *   cheese: function (element) {
 *     return Chirashi.getData(element, 'for') !== 'leonard'
 *   }
 * }) //returns: [<div class="maki salmon cheese" data-for="sheldon"></div>, <div class="maki salmon" data-for="leonard"></div>]
 */
export default function toggleClass (elements, input) {
  if (input instanceof Array || typeof input === 'string') {
    const classes = _stringToArray(input)

    return forElements(elements, element => {
      if (!element.classList) return

      forEach(classes, className => {
        element.classList.toggle(className)
      })
    })
  } else {
    return forElements(elements, element => {
      if (!element.classList) return

      forIn(input, (classes, condition) => {
        const toggle = condition(element)
        forEach(_stringToArray(classes), className => {
          element.classList.toggle(className, toggle)
        })
      })
    })
  }
}
