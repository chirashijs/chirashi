import getElement from '../core/getElement'

/**
 * Get closest element matching the tested selector or element traveling up the DOM tree from element to limit.
 * @param {string | HTMLElement | SVGElement | Text} element - Selector or element.
 * @param {string | HTMLElement | SVGElement | Text} tested - The selector or dom element to match.
 * @param {string | document | HTMLElement | SVGElement} [limit=document] - Returns false when this selector or element is reached.
 * @return {bool | HTMLElement | SVGElement | Text} matchedElement - The matched element or false.
 * @example //esnext
 * import { createElement, append, closest } from 'chirashi'
 * const maki = createElement('.maki')
 * const cheese = createElement('.cheese')
 * append(maki, cheese)
 * append(cheese, '.avocado')
 * append(document.body, maki)
 * closest('.avocado', '.maki') //returns: <div class="maki"></div>
 * closest('.avocado', '.maki', '.cheese') //returns: false
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * var cheese = Chirashi.createElement('.cheese')
 * Chirashi.append(maki, cheese)
 * Chirashi.append(cheese, '.avocado')
 * Chirashi.append(document.body, maki)
 * Chirashi.closest('.avocado', '.maki') //returns: <div class="maki"></div>
 * Chirashi.closest('.avocado', '.maki', '.cheese') //returns: false
 */
export default function closest (element, tested, limit = document) {
  element = getElement(element)

  if (!element || (typeof limit === 'string' ? element.matches(limit) : element === limit)) {
    return false
  }

  if (typeof tested === 'string' ? element.matches(tested) : element === tested) {
    return element
  }

  return !!element.parentNode && closest(element.parentNode, tested, limit)
}
