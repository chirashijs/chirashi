import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#forIn', () => {
  const object = {
    a: 1,
    b: 2,
    c: 3
  }

  it('should be defined as a function', () => {
    assert.isFunction(Chirashi.forIn)
  })

  it('should execute callback on keys of object', () => {
    const keys = Object.keys(object)
    let i = keys.length
    Chirashi.forIn(object, (key, value) => {
      assert.equal(key, keys[--i])
      assert.equal(value, object[keys[i]])
    })
  })

  it('should execute callback on keys of object in same order', () => {
    const keys = Object.keys(object)
    let i = -1
    Chirashi.forIn(object, (key, value) => {
      assert.equal(key, keys[++i])
      assert.equal(value, object[keys[i]])
    }, true)
  })

  it('shouldn\'t crash if input isn\'t an object', () => {
    assert.equal(Chirashi.forIn('test', (key, value) => {}), undefined)
  })
})
