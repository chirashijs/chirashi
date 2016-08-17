import forElements from '../core/for-elements'
import prefix      from '../browser/prefix'

/**
* Apply the provided 3D scale transformation on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function scale3D (elements, transformation, keep) {
    let scaleX = 'scaleX' in transformation ? transformation.scaleX : ('scale' in transformation ? transformation.scale : 1),
        scaleY = 'scaleY' in transformation ? transformation.scaleY : ('scale' in transformation ? transformation.scale : 1),
        scaleZ = 'scaleZ' in transformation ? transformation.scaleZ : 1

    let style = `scale3d(${scaleX},${scaleY},${scaleZ})`

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
