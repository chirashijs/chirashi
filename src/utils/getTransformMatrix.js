import forEach from '../core/forEach'
import forIn from '../core/forIn'

function _applyPropertyToMatrix (property, value, matrix) {
  // if (property === 'x') {
  //   matrix[12] += value
  // } else if (property === 'y') {
  //   matrix[13] += value
  // } else if (property === 'z') {
  //   matrix[14] += value
  // } else if (property.indexOf('rotate') === 0) {
  //   let cosValue = Math.cos(value)
  //   let sinValue = Math.sin(value)
  //   let indexes
  //
  //   if (property === 'rotateX') {
  //     indexes = [5, 6, 9, 10]
  //   } else if (property === 'rotateY') {
  //     indexes = [0, 8, 2, 10]
  //   } else {
  //     indexes = [0, 1, 4, 5]
  //   }
  //
  //   matrix[indexes[0]] *= cosValue
  //   matrix[indexes[1]] += sinValue
  //   matrix[indexes[2]] -= sinValue
  //   matrix[indexes[3]] *= cosValue
  // } else if (property === scale)

  let indexes, cosValue, sinValue, tanValue

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
    case 'rotateY':
    case 'rotateZ':
      cosValue = Math.cos(value)
      sinValue = Math.sin(value)

      if (property === 'rotateX') {
        indexes = [5, 6, 9, 10]
      } else if (property === 'rotateY') {
        indexes = [0, 8, 2, 10]
      } else {
        indexes = [0, 1, 4, 5]
      }

      matrix[indexes[0]] *= cosValue
      matrix[indexes[1]] += sinValue
      matrix[indexes[2]] -= sinValue
      matrix[indexes[3]] *= cosValue
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

      matrix[1] += tanValue
      matrix[4] += tanValue

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
export default function getTransformMatrix (transformation) {
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

  forEach(matrix, (item, index) => {
    matrix[index] = +item.toFixed(2)
  })

  return matrix
}
