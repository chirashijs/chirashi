import support3D from '../browser/support3D'

import matrix2D from './matrix2D'
import matrix3D from './matrix3D'

/**
* Apply the provided transformation as a matrix (3D if supported) on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function matrix (elements, transformation) {
    return support3D ? matrix3D(elements, transformation) : matrix2D(elements, transformation)
}
