import forElements from '../core/for-elements'

const unitLessAttributes = [
    'z-index',
    'zoom',
    'font-weight',
    'line-height',
    'counter-reset',
    'counter-increment',
    'volume',
    'stress',
    'pitch-range',
    'richness',
    'opacity'
]

/**
* Set the provided style to elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} style - The style options as object linking value to property
* @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
*/
export default function setStyle (elements, style) {
    let properties = Object.keys(style)

    let i = properties.length
    while(i--) {
        let property = properties[i]

        if (unitLessAttributes.indexOf(property) != -1) {
            let value = style[property]

            if (typeof value == 'number')
                style[property] += 'px'
        }
    }

    return forElements(elements, element => {
        if (!element.style) return

        Object.assign(element.style, style)
    })
}
