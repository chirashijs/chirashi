import forElements from '../core/forElements'

/**
 * Iterates over classes and add it on each element of elements.
 * @param {string | Array | NodeList | HTMLCollection | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {string | Array} classes - Array of classes or string of classes seperated with comma and/or spaces.
 * @return {Array} elements - The elements for chaining.
 * @example //esnext
 * import { createElement, addClass } from 'chirashi'
 * const maki = createElement('div')
 * addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * addClass(maki, 'seaweed, cheese') //returns: <div class="wasabi cheese seaweed"></div>
 * addClass(maki, 'avocado salmon') //returns: <div class="wasabi cheese seaweed salmon avocado"></div>
 * addClass(maki, ['egg', 'tuna']) //returns: <div class="wasabi cheese seaweed salmon avocado tuna egg"></div>
 * @example //es5
 * var maki = Chirashi.createElement('div')
 * Chirashi.addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * Chirashi.addClass(maki, 'seaweed, cheese') //returns: <div class="wasabi cheese seaweed"></div>
 * Chirashi.addClass(maki, 'avocado salmon') //returns: <div class="wasabi cheese seaweed salmon avocado"></div>
 * Chirashi.addClass(maki, ['egg', 'tuna']) //returns: <div class="wasabi cheese seaweed salmon avocado tuna egg"></div>
 */
export default function addClass (elements, classes) {
  if (typeof classes === 'string') classes = classes.split(/[,\s]+/g)

  return forElements(elements, element => {
    if (!element.classList) return

    element.classList.add(...classes)
  })
}
