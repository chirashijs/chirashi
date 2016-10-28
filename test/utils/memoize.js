import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#memoize', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.memoize, 'function')
  })

  let passed = 0

  function increment (value) {
    ++passed

    return value + 1
  }

  const memoized = Chirashi.memoize(increment)

  window.it('should cache result of memoized function', () => {
    assert.equal(memoized(1), 2, 'should apply callback on value')
    assert.ok(memoized(1) === 2 && passed === 1, 'should return cached value')
  })
})
