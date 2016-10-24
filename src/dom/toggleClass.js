import forElements from '../core/forElements'

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
  if (typeof classes === 'string') classes = classes.split(/[,\s]+/g)

  return forElements(elements, element => {
    if (!element.classList) return

    element.classList.toggle(...classes)
  })
}
