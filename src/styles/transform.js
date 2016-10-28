import setStyle from '../styles/setStyle'
import getTransformMatrix from '../utils/getTransformMatrix'

/**
 * Set the provided transformation to all elements using a matrix if needed and 3d if supported.
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {object} [transformation] - The transformation as an object
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function transform (elements, transformation) {
  setStyle(elements, {transform: `matrix3d(${getTransformMatrix(transformation).join(',')})`})
}
