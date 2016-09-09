import forElements from '../core/forElements'

/**
 * Add all classes on each elements.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {string} classes - The classes seperated with spaces
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function addClass (elements, classes) {
    classes = classes.split(' ')

    return forElements(elements, element => {
        if (!element.classList) return

        let i = classes.length
        while(i--) element.classList.add(classes[i])
    })
}
