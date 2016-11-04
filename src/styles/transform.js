import setStyle from '../styles/setStyle'
import forEach from '../core/forEach'

function _getValues (transformation, axes, name, defaultVal, defaultAxes) {
  const values = {}

  if (name in transformation) {
    if (typeof transformation[name] === 'object') {
      forEach(axes, axe => {
        values[`${name}${axe.toUpperCase()}`] = axe in transformation[name] ? transformation[name][axe] : defaultVal
      })
    } else {
      forEach(axes, axe => {
        values[`${name}${axe.toUpperCase()}`] = defaultAxes[axe]
      })
    }
  } else {
    forEach(axes, axe => {
      values[`${name}${axe.toUpperCase()}`] = defaultVal
    })
  }

  return values
}

function _transformMatrix (transformation) {
  let x = 'x' in transformation ? transformation.x : 0
  let y = 'y' in transformation ? transformation.y : 0
  let z = 'z' in transformation ? transformation.z : 0

  let { scaleX, scaleY, scaleZ } = _getValues(transformation, ['x', 'y', 'z'], 'scale', 1, { x: transformation.scale, y: transformation.scale, z: 1 })
  let { rotateX, rotateY, rotateZ } = _getValues(transformation, ['x', 'y', 'z'], 'rotate', 0, { x: 0, y: 0, z: transformation.rotate })
  let { skewX, skewY } = _getValues(transformation, ['x', 'y'], 'skew', 0, { x: transformation.skew, y: transformation.skew })

  const cosRotateX = Math.cos(rotateX)
  const sinRotateX = Math.sin(rotateX)
  const cosRotateY = Math.cos(rotateY)
  const sinRotateY = Math.sin(rotateY)
  const cosRotateZ = Math.cos(rotateZ)
  const sinRotateZ = Math.sin(rotateZ)
  const tanSkewX = Math.tan(skewX)
  const tanSkewY = Math.tan(skewY)

  const matrix = [
    scaleX * cosRotateY * cosRotateZ, sinRotateZ + tanSkewY, -sinRotateY, 0,
    -sinRotateZ + tanSkewX, scaleY * cosRotateX * cosRotateZ, sinRotateX, 0,
    sinRotateY, -sinRotateX, scaleZ * cosRotateX * cosRotateY, 0,
    x, y, z, 1
  ]

  forEach(matrix, (item, index) => {
    matrix[index] = +item.toFixed(2)
  })

  return matrix
}

/**
 * Set the provided transformation to all elements using a matrix if needed and 3d if supported.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {object} [transformation] - The transformation as an object
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function transform (elements, transformation) {
  setStyle(elements, {transform: `matrix3d(${_transformMatrix(transformation).join(',')})`})
}
