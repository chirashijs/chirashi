import _nodelistToArray from '../_internals/_nodelistToArray'
import _getElements from '../_internals/_getElements'
import _chirasizeArray from '../_internals/_chirasizeArray'
import isDomElement from './isDomElement'
import forEach from './forEach'

/**
 * Get dom element recursively from iterable or selector.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement|Text)} input - The iterable, selector or elements.
 * @return {Array} domElements - The array of dom elements from input.
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
  if (typeof input === 'string') {
    return _getElements(document, input)
  }

  if (input instanceof window.NodeList || input instanceof window.HTMLCollection) {
    return _nodelistToArray(input)
  }

  if (input instanceof Array) {
    if (input['_chrsh-valid']) {
      return input
    }

    let output = []
    forEach(input, _pushRecursive.bind(null, output))

    return _chirasizeArray(output)
  }

  return _chirasizeArray(isDomElement(input) ? [input] : [])
}

function _pushRecursive (output, element) {
  output.push.apply(output, getElements(element))
}
