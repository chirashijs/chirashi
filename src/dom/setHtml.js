import forElements from '../core/forElements'

/**
 * Set inner html of elements to string.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} string - The content to inject in the elements
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function setHtml (elements, string) {
    return forElements(elements, element => {
        element.innerHTML = string
    })
}
