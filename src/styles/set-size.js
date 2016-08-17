import forElements from '../core/for-elements'

/**
* Set the provided size to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} size - The size as an object with width and height
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
export default function setSize (elements, size) {
    let width = size.width, height = size.height

    if (typeof width == 'number') width += 'px'
    if (typeof height == 'number') height += 'px'

    return forElements(elements, element => {
        if (!element.style) return

        Object.assign(element.style, { width, height })
    })
}
