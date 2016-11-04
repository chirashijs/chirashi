import forEach from './forEach'
import isDomElement from './isDomElement'

const breakingMethods = ['push', 'splice', 'unshift']

/**
* Get recursively dom element from iterable or selector.
* @param {string | Array | NodeList | HTMLCollection | window | document | HTMLElement | SVGElement | Text} input - The iterable, selector or elements.
* @return {Array} domElements - The array of dom elements from elements.
* @return {function} domElements.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
* @example //esnext
* import { createElement, append, getElements } from 'chirashi'
* const sushi = createElement('.sushi')
* const unagi = createElement('.unagi')
* const yakitori = createElement('.yakitori')
* const sashimi = createElement('.sashimi')
* append(document.body, [sushi, unagi, yakitori, sashimi])
* getElements('div') //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="yakitori"></div>, <div class="sashimi"></div>]
* getElements('.yakitori, .sashimi') //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
* getElements([sushi, unagi, '.sashimi', '.wasabi']) //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="sashimi"></div>]
* getElements('.wasabi') //returns: []
* @example //es5
* var sushi = Chirashi.createElement('.sushi')
* var unagi = Chirashi.createElement('.unagi')
* var yakitori = Chirashi.createElement('.yakitori')
* var sashimi = Chirashi.createElement('.sashimi')
* Chirashi.append(document.body, [sushi, unagi, yakitori, sashimi])
* Chirashi.getElements('div') //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="yakitori"></div>, <div class="sashimi"></div>]
* Chirashi.getElements('.yakitori, .sashimi') //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
* Chirashi.getElements([sushi, unagi, '.sashimi', '.wasabi']) //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="sashimi"></div>]
* Chirashi.getElements('.wasabi') //returns: []
*/
export default function getElements (input) {
  if (input && input['_chrsh-valid']) return input

  let output

  if (typeof input === 'string') {
    output = [...document.querySelectorAll(input)]
  } else if (input instanceof Array) {
    let parsedElements = []
    forEach(input, element => {
      parsedElements.push(...getElements(element))
    })

    output = parsedElements
  } else if (input instanceof window.NodeList || input instanceof window.HTMLCollection) {
    output = [...input]
  } else {
    output = isDomElement(input) ? [input] : []
  }

  output.chrshPush = function (input) {
    this.push(...getElements(input))
    this['_chrsh-valid'] = true

    return this
  }

  forEach(breakingMethods, method => {
    output[method] = function () {
      this['_chrsh-valid'] = false

      return Array.prototype[method].apply(this, arguments)
    }
  })

  output['_chrsh-valid'] = true

  return output
}
