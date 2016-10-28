import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#randomBetween', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.randomBetween, 'function')
  })

  window.it('should return random value between min and max', () => {
    const rand1 = Chirashi.randomBetween(50, -50)
    assert.ok(rand1 >= -50 && rand1 <= 50, 'should return value between min and max')

    const rand2 = Chirashi.randomBetween(50)
    assert.ok(rand2 >= 0 && rand2 <= 50, 'should return value between 0 and max')
  })
})
