import prefix from '../browser/prefix'
import transformTo2dMatrix from '../utils/transformTo2dMatrix'
import setStyle from './setStyle'

/**
* Apply the provided transformation as a 2d matrix on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.x} x - translateX option
* @param {object.y} y - translateY option
* @param {object.rotate} rotate - rotate option
* @param {object.rotate.x} x - rotateX option
* @param {object.rotate.y} y - rotateY option
* @param {object.rotateX} rotateX - rotateX option
* @param {object.rotateY} rotateY - rotateY option
* @param {object.rotate} rotate - rotate option
* @param {object.scale} scale - scale option
* @param {object.scale.x} x - scaleX option
* @param {object.scale.y} y - scaleY option
* @param {object.scaleX} scaleX - scaleX option
* @param {object.scaleY} scaleY - scaleY option
* @param {object.skew} skew - skew option
* @param {object.skew.x} x - skewX option
* @param {object.skew.y} y - skewY option
* @param {object.skewX} skewX - skewX option
* @param {object.skewY} skewY - skewY option
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function matrix2d (elements, transformation) {
  const matrix = transformTo2dMatrix(transformation).join(',')

  return setStyle(elements, {[`${prefix}transform`]: `matrix(${matrix})`})
}
