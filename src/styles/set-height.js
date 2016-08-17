import forElements from '../core/for-elements'

/**
* Set the provided height to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {number} height - The height
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
export default function setHeight (elements, height) {
    if (typeof height == 'number') height += 'px'

    return forElements(elements, element => {
        if (!element.style) return

        element.style.height = height
    })
}
