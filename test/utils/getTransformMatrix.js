function equalsArray (array1, array2) {
  // if the other array is a falsy value, return
  if (!array2) return false

  // compare lengths - can save a lot of time
  if (array1.length !== array2.length) return false

  for (var i = 0, l = array1.length; i < l; i++) {
    // Check if we have nested array2s
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      // recurse into the nested array2s
      if (!equalsArray(array1[i], array2[i])) return false
    } else if (array1[i] !== array2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false
    }
  }
  return true
}

import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#getTransformMatrix', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.getTransformMatrix, 'function')
  })

  window.it('should return 3d transform matrix from transformation', () => {
    assert.ok(equalsArray([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], Chirashi.getTransformMatrix({})), 'should return 3d identity matrix')
    assert.ok(equalsArray([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 6, 7, 1], Chirashi.getTransformMatrix({x: 5, y: 6, z: 7})), 'should support 3d translation')
    assert.ok(equalsArray([2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], Chirashi.getTransformMatrix({scale: 2})), 'should support global 3d scale')
    assert.ok(equalsArray([2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1], Chirashi.getTransformMatrix({scaleX: 2, scaleY: 3, scaleZ: 4})), 'should support different axes 3d scale')
    assert.ok(equalsArray([2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1], Chirashi.getTransformMatrix({scale: {x: 2, y: 3, z: 4}})), 'should support different axes 3d scale as object')
    assert.ok(equalsArray([0.53, 0.85, 0, 0, -0.85, 0.53, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], Chirashi.getTransformMatrix({rotate: 45})), 'should support 3d rotation in radians')
    assert.ok(equalsArray([-0.31, 0.65, -0.91, 0, -0.65, -0.4, 0.85, 0, 0.91, -0.85, 0.21, 0, 0, 0, 0, 1], Chirashi.getTransformMatrix({rotateX: 45, rotateY: 20, rotateZ: 15})), 'should support different axes 3d rotation')
    assert.ok(equalsArray([-0.31, 0.65, -0.91, 0, -0.65, -0.4, 0.85, 0, 0.91, -0.85, 0.21, 0, 0, 0, 0, 1], Chirashi.getTransformMatrix({rotate: {x: 45, y: 20, z: 15}})), 'should support different axes 3d rotation as object')
    assert.ok(equalsArray([1, 1.62, 0, 0, 1.62, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], Chirashi.getTransformMatrix({skew: 45})), 'should support 3d skew radians')
    assert.ok(equalsArray([1, 1.62, 0, 0, -0.13, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], Chirashi.getTransformMatrix({skewX: 25, skewY: 45})), 'should support different axes 3d skew')
    assert.ok(equalsArray([1, 1.62, 0, 0, -0.13, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], Chirashi.getTransformMatrix({skew: {x: 25, y: 45}})), 'should support different axes 3d skew as object')
    assert.ok(equalsArray([-0.62, 2.27, -0.91, 0, -0.78, -1.2, 0.85, 0, 0.91, -0.85, 0.86, 0, 5, 6, 7, 1], Chirashi.getTransformMatrix({x: 5, y: 6, z: 7, scale: {x: 2, y: 3, z: 4}, rotate: {x: 45, y: 20, z: 15}, skew: {x: 25, y: 45}})), 'should support 3d all together')
  })
})
