import matrix from './matrix'
import scale from './scale'
import translate from './translate'

/**
 * Set the provided transformation to all elements using a matrix if needed and 3d if supported.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {object} [transformation] - The transformation as an object
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
 export default function transform (elements, transformation) {
    // if skew or rotation use matrix
    if ('skew' in transformation || 'skewX' in transformation || 'skewY' in transformation ||
        'rotate' in transformation || 'rotateX' in transformation || 'rotateY' in transformation || 'rotateZ' in transformation)
        {
            return matrix(elements, transformation)
    }
    else {
         let shouldKeep = false // don't crush translate property

         if (shouldKeep = ('x' in transformation || 'y' in transformation || 'z' in transformation))
            return translate(elements, transformation)

         if ('scale' in transformation || 'scaleX' in transformation || 'scaleY' in transformation || 'scaleZ' in transformation)
            return scale(elements, transformation, shouldKeep)
    }
}
