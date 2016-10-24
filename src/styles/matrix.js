import support3d from '../browser/support3d'

import matrix2d from './matrix2d'
import matrix3d from './matrix3d'

/**
* Apply the provided transformation as a matrix (3d if supported) on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.x} x - translateX option
* @param {object.y} y - translateY option
* @param {object.z} z - translateZ option
* @param {object.rotate} rotate - rotate option
* @param {object.rotate.x} x - rotateX option
* @param {object.rotate.y} y - rotateY option
* @param {object.rotate.z} z - rotateZ option
* @param {object.rotateX} rotateX - rotateX option
* @param {object.rotateY} rotateY - rotateY option
* @param {object.rotateZ} rotateZ - rotateZ option
* @param {object.rotate} rotate - rotate option
* @param {object.scale} scale - scale option
* @param {object.scale.x} x - scaleX option
* @param {object.scale.y} y - scaleY option
* @param {object.scale.z} z - scaleZ option
* @param {object.scaleX} scaleX - scaleX option
* @param {object.scaleY} scaleY - scaleY option
* @param {object.scaleZ} scaleZ - scaleZ option
* @param {object.skew} skew - skew option
* @param {object.skew.x} x - skewX option
* @param {object.skew.y} y - skewY option
* @param {object.skewX} skewX - skewX option
* @param {object.skewY} skewY - skewY option
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function matrix (elements, transformation) {
  return support3d ? matrix3d(elements, transformation) : matrix2d(elements, transformation)
}
