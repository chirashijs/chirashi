import support3D from '../browser/support3D'

import translate2D from './translate2D'
import translate3D from './translate3D'

/**
* Apply the provided translate transformation (3D if supported) on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.x} x - translateX option
* @param {object.y} y - translateY option
* @param {object.z} z - translateZ option
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function translate (elements, transformation, keep) {
    return support3D ? translate3D(elements, transformation, keep) : translate2D(elements, transformation, keep)
}
