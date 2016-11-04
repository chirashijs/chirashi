import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#getAttr', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.getAttr)
  })

  window.it('should return value for element\'s data-attribute', () => {
    const maki = document.createElement('img')
    maki.src = 'http://chirashijs.org/placeholder.png'
    maki.setAttribute('data-src', 'http://chirashijs.org/tasty-maki.png')

    assert.equal(Chirashi.getAttr(maki, 'src'), 'http://chirashijs.org/placeholder.png', 'should return value for attribute')
    assert.equal(Chirashi.getAttr(maki, 'data-src'), 'http://chirashijs.org/tasty-maki.png', 'should return value for data-attribute')
  })
})
