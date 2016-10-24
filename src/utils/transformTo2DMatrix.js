import forIn from '../core/forIn'

function _applyPropertyToMatrix (property, value, matrix) {
  switch (property) {
    case 'x':
      matrix[4] += value
      break

    case 'y':
      matrix[5] += value
      break

    case 'rotate':
      let cosValue = Math.cos(value)
      let sinValue = Math.sin(value)

      matrix[0] *= cosValue
      matrix[1] += sinValue
      matrix[2] -= sinValue
      matrix[3] *= cosValue
      break

    case 'scale':
      matrix[0] *= value
      matrix[2] *= value
      break

    case 'scaleX':
      matrix[0] *= value
      break

    case 'scaleY':
      matrix[3] *= value
      break

    case 'skew':
      let tanValue = Math.tan(value)

      matrix[2] += tanValue
      matrix[1] += tanValue
      break

    case 'skewX':
      matrix[2] += Math.tan(value)
      break

    case 'skewY':
      matrix[1] += Math.tan(value)
      break
  }
}

/**
 * Convert a transformation as object to a 2d matrix as object
 * @param {object} transformation - The transformation object
 * @return {Array} matrix - The 2d matrix
 */
export default function transformTo2dMatrix (transformation) {
  const matrix = [
    1, 0,
    0, 1,
    0, 0
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
