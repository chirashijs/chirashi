import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#forEach', () => {
  const items = [0, 1, 2]
  window.it('should be defined as a function', () => {
    assert.equal(typeof Chirashi.forEach, 'function')
  })

  window.it('should execute callback on array', () => {
    let i = items.length
    Chirashi.forEach(items, (item, index) => {
      assert.equal(--i, index)
      assert.equal(items[index], item)
    })
  })

  window.it('should execute callback on array in same order', () => {
    let i = -1
    Chirashi.forEach(items, (item, index) => {
      assert.equal(++i, index)
      assert.equal(items[index], item)
    }, true)
  })

  window.it('should execute callback on singleton', () => {
    Chirashi.forEach(1, item => {
      assert.equal(1, item)
    })
  })

  window.it('should return items', () => {
    assert.equal(items, Chirashi.forEach(items, () => {}))
  })

  window.it('should return items in array if not', () => {
    assert.equal(1, Chirashi.forEach(1, () => {}).length)
  })
})
