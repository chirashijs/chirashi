import forElements from '../core/forElements'

/**
 * Hide each element of elements using visibility.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @return {string | Array | NodeList | HTMLCollection} elements for chaining
 */
 export default function hide (elements) {
    return forElements(elements, element => {
        if (!element.style) return

        element.style.visibility = 'hidden'
    })
 }
