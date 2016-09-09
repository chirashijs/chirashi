import forElements from '../core/forElements'

/**
* Set the provided size to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} size - The size as an object with width and height
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
export default function setSize (elements, size) {
    if (typeof size.width == 'number') size.width += 'px'
    if (typeof size.height == 'number') size.height += 'px'

    return forElements(elements, element => {
        if (!element.style) return

        Object.assign(element.style, size)
    })
}
