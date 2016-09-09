import forElements from '../core/forElements'
import prefix      from '../browser/prefix'

/**
* Apply the provided scale transformation on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function scale2D (elements, transformation, keep) {
    let scaleX = 'scaleX' in transformation ? transformation.scaleX : ('scale' in transformation ? transformation.scale : 1),
        scaleY = 'scaleY' in transformation ? transformation.scaleY : ('scale' in transformation ? transformation.scale : 1)

    let style = `scale(${scaleX},${scaleY})`

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
