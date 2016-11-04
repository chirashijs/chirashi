import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#getProp', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.getProp)
  })

  window.it('should return value for element\'s property', () => {
    const maki = document.createElement('a')
    maki.href = 'http://chirashijs.org/'

    assert.equal(Chirashi.getProp(maki, 'href'), 'http://chirashijs.org/', 'should return value for property')
    assert.isNull(Chirashi.getProp('.null'), 'should just return if element doesn\'t exist')
  })
})
