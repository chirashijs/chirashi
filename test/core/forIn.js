import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#forIn', () => {
  const object = {
    a: 1,
    b: 2,
    c: 3
  }

  window.it('should be defined as a function', () => {
    assert.isFunction(Chirashi.forIn)
  })

  window.it('should execute callback on keys of object', () => {
    const keys = Object.keys(object)
    let i = keys.length
    Chirashi.forIn(object, (key, value) => {
      assert.equal(key, keys[--i])
      assert.equal(value, object[keys[i]])
    })
  })

  window.it('should execute callback on keys of object in same order', () => {
    const keys = Object.keys(object)
    let i = -1
    Chirashi.forIn(object, (key, value) => {
      assert.equal(key, keys[++i])
      assert.equal(value, object[keys[i]])
    }, true)
  })

  window.it('shouldn\'t crash if input isn\'t an object', () => {
    assert.equal(Chirashi.forIn('test', (key, value) => {}), undefined)
  })
})
