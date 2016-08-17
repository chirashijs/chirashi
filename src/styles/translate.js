import support3D from '../browser/support-3d'

import translate2D from './translate2d'
import translate3D from './translate3d'

/**
* Apply the provided translate transformation (3d if supported) on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function translate (elements, transformation, keep) {
    return support3D ? translate3D(elements, transformation, keep) : translate2D(elements, transformation, keep)
}
