import forElements from '../core/forElements'

/**
* Set the provided width to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {number} width - The width
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
export default function setWidth (elements, width) {
    if (typeof width == 'number') width += 'px'

    return forElements(elements, element => {
        if (!element.style) return

        element.style.width = width
    })
}
