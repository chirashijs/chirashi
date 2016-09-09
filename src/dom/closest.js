import getElement from '../core/getElement'

/**
 * Get closest element matching the tested value traveling up the DOM tree from element.
 * @param {string | HTMLElement | SVGElement} element - The dom element or selector
 * @param {string | HTMLElement | SVGElement} tested - The selector or dom element to match
 * @param {{value: number}} [level] - The value is incremented for each parent tested
 * @return {bool | HTMLElement | SVGElement} matchedElement - The matched element or false
 */
export default function closest (element, tested, level) {
    if (level && typeof level.value != 'undefined') ++level.value

    element = getElement(element)

    return ((!element || element === window || element === document) ?
            false
            : ((typeof tested == 'string' && element.matches(tested) || element == tested) ?
                element
                : closest(element.parentNode, tested, level)))
}
