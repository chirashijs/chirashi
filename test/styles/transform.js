import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#transform', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.transform)
  })

  it('should return transform matrix from transformation', () => {
    const wasabiPea = document.createElement('p')
    wasabiPea.id = 'wasabi'

    Chirashi.transform(wasabiPea, {})
    assert.equal(wasabiPea.style.transform.replace(/[\s]/g, ''), 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)', 'should return identity matrix')

    Chirashi.transform(wasabiPea, {x: 5, y: 6, z: 7})
    assert.equal(wasabiPea.style.transform.replace(/[\s]/g, ''), 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,5,6,7,1)', 'should support translation with matrix')

    Chirashi.transform(wasabiPea, {scale: 2})
    assert.equal(wasabiPea.style.transform.replace(/[\s]/g, ''), 'matrix3d(2,0,0,0,0,2,0,0,0,0,1,0,0,0,0,1)', 'should support scale with matrix')

    Chirashi.transform(wasabiPea, {scale: {x: 2, y: 3, z: 4}})
    assert.equal(wasabiPea.style.transform.replace(/[\s]/g, ''), 'matrix3d(2,0,0,0,0,3,0,0,0,0,4,0,0,0,0,1)', 'should support different axes scale')

    Chirashi.transform(wasabiPea, {rotate: 45})
    assert.equal(wasabiPea.style.transform.replace(/[\s]/g, ''), 'matrix3d(0.53,0.85,0,0,-0.85,0.53,0,0,0,0,1,0,0,0,0,1)', 'should support rotation in radians')

    Chirashi.transform(wasabiPea, {rotate: {x: 45, y: 20, z: 15}})
    assert.equal(wasabiPea.style.transform.replace(/[\s]/g, ''), 'matrix3d(-0.31,0.65,-0.91,0,-0.65,-0.4,0.85,0,0.91,-0.85,0.21,0,0,0,0,1)', 'should support rotation in radians')

    Chirashi.transform(wasabiPea, {skew: 45})
    assert.equal(wasabiPea.style.transform.replace(/[\s]/g, ''), 'matrix3d(1,1.62,0,0,1.62,1,0,0,0,0,1,0,0,0,0,1)', 'should support skew radians')

    Chirashi.transform(wasabiPea, {skew: {x: 25, y: 45}})
    assert.equal(wasabiPea.style.transform.replace(/[\s]/g, ''), 'matrix3d(1,1.62,0,0,-0.13,1,0,0,0,0,1,0,0,0,0,1)', 'should support different axes skew as object')

    Chirashi.transform(wasabiPea, {x: 5, y: 6, z: 7, scale: {x: 2, y: 3}, rotate: {x: 45, y: 20, z: 15}, skew: {x: 25, y: 45}})
    assert.equal(wasabiPea.style.transform.replace(/[\s]/g, ''), 'matrix3d(-0.62,2.27,-0.91,0,-0.78,-1.2,0.85,0,0.91,-0.85,0.21,0,5,6,7,1)', 'should support all together')
  })
})
