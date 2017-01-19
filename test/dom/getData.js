import { assert } from 'chai'
import Chirashi from 'chirashi'

describe('chirashi#getData', () => {
  it('should be a function', () => {
    assert.isFunction(Chirashi.getData)
  })

  it('should return value for element\'s data-attribute', () => {
    const maki = document.createElement('img')
    maki.setAttribute('data-src', 'tasty-maki.png')

    assert.equal(Chirashi.getData(maki, 'src'), 'tasty-maki.png', 'should return value for data-attribute')
  })
})
