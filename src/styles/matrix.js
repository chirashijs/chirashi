import support3D from '../browser/support-3d'

import matrix2d from './matrix2d'
import matrix3d from './matrix3d'

/**
* Apply the provided transformation as a matrix (3d if supported) on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function matrix (elements, transformation) {
    return support3D ? matrix3D(elements, transformation) : matrix2D(elements, transformation)
}
