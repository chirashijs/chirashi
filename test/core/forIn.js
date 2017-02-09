import { assert } from 'chai'
import { forIn } from 'chirashi'

describe('chirashi#forIn', () => {
  const object = {
    a: 1,
    b: 2,
    c: 3
  }

  it('should be defined as a function', () => {
    assert.isFunction(forIn)
  })

  it('should execute callback on keys of object', () => {
    const keys = Object.keys(object)
    let i = 0
    forIn(object, (key, value) => {
      assert.equal(key, keys[i])
      assert.equal(value, object[keys[i++]])
    })
  })

  it('shouldn\'t crash if input isn\'t an object', () => {
    assert.equal(forIn('test', (key, value) => {}), undefined)
  })
})
