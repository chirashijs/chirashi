import forEach from '../core/forEach'
import forElements from '../core/forElements'
import forIn from '../core/forIn'
import _stringToArray from '../internals/_stringToArray'

/**
 * Iterates over classes and toggle it on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} elements - The iterable, selector or elements.
 * @param {string | Array} classes - Array of classes or string of classes seperated with comma and/or spaces.
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
export default function toggleClass (elements, classes) {
  if (typeof classes === 'object') {
    return forElements(elements, element => {
      if (!element.classList.toggle) return

      forIn(classes, (className, condition) => {
        element.classList.toggle(className, condition(element))
      })
    })
  } else {
    classes = _stringToArray(classes)

    return forElements(elements, element => {
      if (!element.classList.toggle) return

      forEach(classes, element.classList.toggle.bind(element.classList))
    })
  }
}
