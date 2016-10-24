import forIn from '../core/forIn'

function _applyPropertyToMatrix (property, value, matrix) {
  let cosValue, sinValue, tanValue

  switch (property) {
    case 'x':
      matrix[12] += value
      break

    case 'y':
      matrix[13] += value
      break

    case 'z':
      matrix[14] += value
      break

    case 'rotate':
      cosValue = Math.cos(value)
      sinValue = Math.sin(value)

      matrix[0] *= cosValue
      matrix[1] += sinValue
      matrix[4] -= sinValue
      matrix[5] *= cosValue
      break

    case 'rotateX':
      cosValue = Math.cos(value)
      sinValue = Math.sin(value)

      matrix[5] *= cosValue
      matrix[6] += sinValue
      matrix[9] -= sinValue
      matrix[10] *= cosValue
      break

    case 'rotateY':
      cosValue = Math.cos(value)
      sinValue = Math.sin(value)

      matrix[0] *= cosValue
      matrix[2] -= sinValue
      matrix[8] += sinValue
      matrix[10] *= cosValue
      break

    case 'rotateZ':
      cosValue = Math.cos(value)
      sinValue = Math.sin(value)

      matrix[0] *= cosValue
      matrix[1] += sinValue
      matrix[4] -= sinValue
      matrix[5] *= cosValue
      break

    case 'scale':
      matrix[0] *= value
      matrix[5] *= value
      break

    case 'scaleX':
      matrix[0] *= value
      break

    case 'scaleY':
      matrix[5] *= value
      break

    case 'scaleZ':
      matrix[10] *= value
      break

    case 'skew':
      tanValue = Math.tan(value)

      matrix[4] += tanValue
      matrix[1] += tanValue
      break

    case 'skewX':
      matrix[4] += Math.tan(value)
      break

    case 'skewY':
      matrix[1] += Math.tan(value)
      break
  }
}

/**
 * Convert a transformation as object to a 3d matrix as object
 * @param {object} transformation - The transformation object
 * @return {Array} matrix - The 3d matrix
 */
export default function transformTo3dMatrix (transformation) {
  const matrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  forIn(transformation, (prop, value) => {
    if (typeof value === 'object') {
      forIn(value, (subProp, subValue) => {
        _applyPropertyToMatrix(prop + subProp.toUpperCase(), subValue, matrix)
      })
    } else {
      _applyPropertyToMatrix(prop, value, matrix)
    }
  })

  return matrix
}
