import forElements from '../core/for-elements'
import prefix      from '../browser/prefix'

/**
* Apply the provided translate transformation on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function translate2D (elements, transformation, keep) {
    let x = 'x' in transformation ? transformation.x : 0,
        y = 'y' in transformation ? transformation.y : 0

    if (typeof x == 'number') x += 'px'
    if (typeof y == 'number') y += 'px'

    let style = `translate(${x},${y})`

    return forElements(elements, element => {
        if (!element.style) return

        if (keep) {
            element.style[`${prefix}transform`] += ` ${style}`
            element.style.transform             += ` ${style}`
        }
        else {
            element.style[`${prefix}transform`] = style
            element.style.transform             = style
        }
    })
}
