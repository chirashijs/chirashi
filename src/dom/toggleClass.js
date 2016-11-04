import forEach from '../core/forEach'
import forElements from '../core/forElements'
import forIn from '../core/forIn'
import _stringToArray from '../internals/_stringToArray'

/**
 * Iterates over classes and toggle it on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} elements - The iterable, selector or elements.
 * @param {string | Array | Object} classes - Array of classes or string of classes seperated with comma and/or spaces.
 * @return {Array} elements - The elements for chaining.
 * @example //esnext
 * import { createElement, toggleClass } from 'chirashi'
 * const maki = createElement('.wasabi.salmon.maki') //returns: <div class="maki salmon wasabi"></div>
 * const sushi = createElement('.salmon.sushi') //returns: <div class="sushi salmon"></div>
 * toggleClass([maki, sushi], 'wasabi') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon wasabi"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.wasabi.salmon.maki') //returns: <div class="wasabi salmon maki"></div>
 * var sushi = Chirashi.createElement('.salmon.sushi') //returns: <div class="salmon sushi"></div>
 * Chirashi.toggleClass([maki, sushi], 'wasabi') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon wasabi"></div>]
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
        forEach(_stringToArray(classes), className => {
          element.classList.toggle(className, condition(element))
        })
      })
    })
  }
}
