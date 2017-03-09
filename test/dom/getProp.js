import { assert } from 'chai'
import { getProp } from 'chirashi'

describe('chirashi#getProp', () => {
  it('should be a function', () => {
    assert.isFunction(getProp)
  })

  it('should return value for element\'s property', () => {
    const maki = document.createElement('a')
    maki.href = 'http://chirashijs.org/'
    maki.target = '_self'

    assert.equal(getProp(maki, 'href'), 'http://chirashijs.org/', 'should return value for property')
    assert.deepEqual(getProp(maki, 'href', 'target'), { href: 'http://chirashijs.org/', target: '_self' }, 'should return object for multiple properties')

    assert.isFalse(getProp('.null'), 'should return false if element doesn\'t exist')
  })
})
