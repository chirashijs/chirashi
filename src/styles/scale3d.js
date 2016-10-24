import forElements from '../core/forElements'
import prefix from '../browser/prefix'

/**
* Apply the provided 3d scale transformation on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.scale} scale - scale option
* @param {object.scale.x} x - scaleX option
* @param {object.scale.y} y - scaleY option
* @param {object.scale.z} z - scaleZ option
* @param {object.scaleX} scaleX - scaleX option
* @param {object.scaleY} scaleY - scaleY option
* @param {object.scaleZ} scaleZ - scaleZ option
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function scale3d (elements, transformation, keep) {
  let scaleX
  if ('scaleX' in transformation) {
    scaleX = transformation.scaleX
  } else if ('scale' in transformation) {
    if ('x' in transformation.scale) {
      scaleX = transformation.scale.x
    } else {
      scaleX = transformation.scale
    }
  } else {
    scaleX = 1
  }

  let scaleY
  if ('scaleY' in transformation) {
    scaleY = transformation.scaleY
  } else if ('scale' in transformation) {
    if ('y' in transformation.scale) {
      scaleY = transformation.scale.y
    } else {
      scaleY = transformation.scale
    }
  } else {
    scaleY = 1
  }

  let scaleZ
  if ('scaleZ' in transformation) {
    scaleZ = transformation.scaleZ
  } else if ('scale' in transformation && 'z' in transformation.scale) {
    scaleZ = transformation.scale.z
  } else {
    scaleZ = 1
  }

  const style = `scale3d(${scaleX},${scaleY},${scaleZ})`

  return forElements(elements, element => {
    if (!element.style) return

    if (keep) {
      element.style[`${prefix}transform`] += ` ${style}`
    } else {
      element.style[`${prefix}transform`] = style
    }
  })
}
