import setStyleProp from '../styles/setStyleProp'
import forEach from '../core/forEach'

/**
 * Compute and apply 3d transform matrix from provided transformation to each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable or selector.
 * @param {Transformation} transformation - The transformation as an object
 * @return {Array} iterable - The getElements' result for chaining.
 * @return {function} domElements.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
 * @example //esnext
 * import { createElement, setHtml, transform } from 'chirashi'
 * const wasabiPea = createElement('p')
 * setHtml(wasabiPea, 'Wasabi')
 * transform(wasabiPea, {}) // returns: [<p style="transform: "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {x: 5, y: 6, z: 7}) // returns: [<p style="transform: "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,5,6,7,1)">Wasabi</p>]
 * transform(wasabiPea, {scale: 2}) // returns: [<p style="transform: "matrix3d(2,0,0,0,0,2,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {scale: {x: 2, y: 3, z: 4}}) // returns: [<p style="transform: "matrix3d(2,0,0,0,0,3,0,0,0,0,4,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {rotate: 45}) // returns: [<p style="transform: "matrix3d(0.53,0.85,0,0,-0.85,0.53,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {rotate: {x: 45, y: 20, z: 15}}) // returns: [<p style="transform: "matrix3d(-0.31,0.65,-0.91,0,-0.65,-0.4,0.85,0,0.91,-0.85,0.21,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {skew: 45}) // returns: [<p style="transform: "matrix3d(1,1.62,0,0,1.62,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {skew: {x: 25, y: 45}}) // returns: [<p style="transform: "matrix3d(1,1.62,0,0,-0.13,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {x: 5, y: 6, z: 7, scale: {x: 2, y: 3}, rotate: {x: 45, y: 20, z: 15}, skew: {x: 25, y: 45}}) // returns: [<p style="transform: "matrix3d(-0.62,2.27,-0.91,0,-0.78,-1.2,0.85,0,0.91,-0.85,0.21,0,5,6,7,1)">Wasabi</p>]
 * @example //es5
 * var wasabiPea = Chirashi.createElement('p')
 * Chirashi.setHtml(wasabiPea, 'Wasabi')
 * Chirashi.transform(wasabiPea, {}) // returns: [<p style="transform: "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {x: 5, y: 6, z: 7}) // returns: [<p style="transform: "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,5,6,7,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {scale: 2}) // returns: [<p style="transform: "matrix3d(2,0,0,0,0,2,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {scale: {x: 2, y: 3, z: 4}}) // returns: [<p style="transform: "matrix3d(2,0,0,0,0,3,0,0,0,0,4,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {rotate: 45}) // returns: [<p style="transform: "matrix3d(0.53,0.85,0,0,-0.85,0.53,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {rotate: {x: 45, y: 20, z: 15}}) // returns: [<p style="transform: "matrix3d(-0.31,0.65,-0.91,0,-0.65,-0.4,0.85,0,0.91,-0.85,0.21,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {skew: 45}) // returns: [<p style="transform: "matrix3d(1,1.62,0,0,1.62,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {skew: {x: 25, y: 45}}) // returns: [<p style="transform: "matrix3d(1,1.62,0,0,-0.13,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {x: 5, y: 6, z: 7, scale: {x: 2, y: 3}, rotate: {x: 45, y: 20, z: 15}, skew: {x: 25, y: 45}}) // returns: [<p style="transform: "matrix3d(-0.62,2.27,-0.91,0,-0.78,-1.2,0.85,0,0.91,-0.85,0.21,0,5,6,7,1)">Wasabi</p>]
 */
export default function transform (elements, transformation) {
  return setStyleProp(elements, { transform: 'matrix3d(' + _transformMatrix(transformation).join(',') + ')' })
}

function _transformFromObj (values, transformation, name, defaultVal, axe) {
  values[name + axe.toUpperCase()] = axe in transformation[name] ? transformation[name][axe] : defaultVal
}

function _transformFromGlobal (values, name, defaultAxes, axe) {
  values[name + axe.toUpperCase()] = defaultAxes[axe]
}

function _transformFromDefault (values, name, defaultVal, axe) {
  values[name + axe.toUpperCase()] = defaultVal
}

function _getValues (transformation, axes, name, defaultVal, defaultAxes) {
  const values = {}

  if (name in transformation) {
    if (typeof transformation[name] === 'object') {
      // set transformation on axes from object
      forEach(axes, _transformFromObj.bind(null, values, transformation, name, defaultVal))
    } else {
      // set transformation on each axes from global value
      forEach(axes, _transformFromGlobal.bind(null, values, name, defaultAxes))
    }
  } else {
    // set default transformation
    forEach(axes, _transformFromDefault.bind(null, values, name, defaultVal))
  }

  return values
}

function _roundMatrix (matrix, item, index) {
  matrix[index] = +item.toFixed(2)
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

  forEach(matrix, _roundMatrix.bind(null, matrix))

  return matrix
}

/**
 * @typedef {Object} Transformation
 * @property {number} [x=0] - Translation value on x axis in pixels.
 * @property {number} [y=0] - Translation value on y axis in pixels.
 * @property {number} [z=0] - Translation value on z axis in pixels.
 * @property {(number|object)} [scale=1] - Scale value for x and y axes or object of values for axes.
 * @property {number} [scale.x=1] - Scale value on x axis.
 * @property {number} [scale.y=1] - Scale value on y axis.
 * @property {number} [scale.z=1] - Scale value on z axis.
 * @property {(number|object)} [rotate=0] - Rotation value for z axis in radians or object of values for axes.
 * @property {number} [rotate.x=0] - Rotation value on x axis in radians.
 * @property {number} [rotate.y=0] - Rotation value on y axis in radians.
 * @property {number} [rotate.z=0] - Rotation value on z axis in radians.
 * @property {(number|object)} [skew=0] - Skew value for x and y axes in radians or object of values for axes.
 * @property {number} [skew.x=0] - Skew value on x axis in radians.
 * @property {number} [skew.y=0] - Skew value on y axis in radians.
 */
