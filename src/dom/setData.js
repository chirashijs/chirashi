import forElements from '../core/forElements'

/**
 * Set data attributes from attributes object keys to values on elements
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {Object} attributes - attribute names and values association
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function setData (elements, attributes) {
    let attributesName = Object.keys(attributes)

    return forElements(elements, element => {
        if (!element.setAttribute) return

        let i = attributesName.length, attributeName
        while(i--) {
            attributeName = attributesName[i]
            value = attributes[attributeName]

            if (value)
                element.setAttribute('data-'+attributeName, value)
            else
                element.removeAttribute(name)
        }
    })
}
