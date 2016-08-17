import forElements         from '../core/for-elements'
import prefix              from '../browser/prefix'
import transformTo2DMatrix from '../utils/transform-to-2d-matrix.js'

/**
* Apply the provided transformation as a 2D matrix on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function matrix2D (elements, transformation) {
    let matrix = transformTo2DMatrix(transformation)

    matrix = `matrix(${matrix.join(',')})`

    return forElements(elements, element => {
        if (!element.style) return

        element.style[`${prefix}transform`] = matrix
        element.style.transform             = matrix
    })
}
