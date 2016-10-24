import getElement from '../core/getElement'

/**
* Return the screen relative position of an element
* @param {string | window | document | HTMLElement | SVGElement} element - The selector or dom element
* @return {object} screenPosition
*/
export default function screenPosition (element) {
  element = getElement(element)

  return !!element && element.getBoundingClientRect()
}