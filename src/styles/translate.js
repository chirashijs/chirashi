import support3d from '../browser/support3d'

import translate2d from './translate2d'
import translate3d from './translate3d'

/**
* Apply the provided translate transformation (3d if supported) on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.x} x - translateX option
* @param {object.y} y - translateY option
* @param {object.z} z - translateZ option
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function translate (elements, transformation, keep) {
  return support3d ? translate3d(elements, transformation, keep) : translate2d(elements, transformation, keep)
}
