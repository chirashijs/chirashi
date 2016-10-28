import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#clamp', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.clamp, 'function')
  })

  window.it('should return clamped value', () => {
    assert.equal(Chirashi.clamp(50, -100, 100), 50, 'should return number if between')
    assert.equal(Chirashi.clamp(200, -100, 100), 100, 'should return max if above')
    assert.equal(Chirashi.clamp(-200, -100, 100), -100, 'should return min if below')
    assert.equal(Chirashi.clamp(-1), 0, 'should use 0 as default min')
    assert.equal(Chirashi.clamp(3), 1, 'should use 1 as default max')
    assert.equal(Chirashi.clamp('NaN'), 1, 'should return max if NaN')
  })
})
