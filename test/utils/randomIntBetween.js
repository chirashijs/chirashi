import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#randomIntBetween', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.randomIntBetween, 'function')
  })

  window.it('should return random value between min and max', () => {
    const rand1 = Chirashi.randomIntBetween(50, -50)
    assert.ok(rand1 === parseInt(rand1, 10) && rand1 >= -50 && rand1 <= 50, 'should return int between min and max')

    const rand2 = Chirashi.randomIntBetween(50)
    assert.ok(rand2 === parseInt(rand2, 10) && rand2 >= 0 && rand2 <= 50, 'should return int between 0 and max')
  })
})
