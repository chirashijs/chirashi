import forElements from '../core/for-elements'

/**
 * Set attributes from attributes object keys to values on elements
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {Object} attributes - attribute names and values association
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function setAttr (elements, attributes) {
    let attributesName = Object.keys(attributes)

    return forElements(elements, element => {
        if (!element.setAttribute) return

        let i = attributesName.length, attributeName, value
        while(i--) {
            attributeName = attributesName[i]
            value = attributes[attributeName]

            if (value)
                element.setAttribute(attributeName, value)
            else
                element.removeAttribute(name)
        }
    })
}
