import { assert } from 'chai'
import { getProp } from 'chirashi'

describe('chirashi#getProp', () => {
  it('should be a function', () => {
    assert.isFunction(getProp)
  })

  it('should return value for element\'s property', () => {
    const maki = document.createElement('a')
    maki.href = 'http://chirashijs.org/'

    assert.equal(getProp(maki, 'href'), 'http://chirashijs.org/', 'should return value for property')
    assert.isNull(getProp('.null'), 'should just return if element doesn\'t exist')
  })
})
