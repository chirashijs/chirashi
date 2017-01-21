import { assert } from 'chai'
import { getAttr } from 'chirashi'

describe('chirashi#getAttr', () => {
  it('should be a function', () => {
    assert.isFunction(getAttr)
  })

  it('should return value for element\'s data-attribute', () => {
    const maki = document.createElement('img')
    maki.src = 'http://chirashijs.org/placeholder.png'
    maki.setAttribute('data-src', 'http://chirashijs.org/tasty-maki.png')

    assert.equal(getAttr(maki, 'src'), 'http://chirashijs.org/placeholder.png', 'should return value for attribute')
    assert.equal(getAttr(maki, 'data-src'), 'http://chirashijs.org/tasty-maki.png', 'should return value for data-attribute')
  })
})
