import { assert } from 'chai'
import { getData } from 'chirashi'

describe('chirashi#getData', () => {
  it('should be a function', () => {
    assert.isFunction(getData)
  })

  it('should return value for element\'s data-attribute', () => {
    const maki = document.createElement('img')
    maki.setAttribute('data-src', 'tasty-maki.png')
    maki.setAttribute('data-alt', 'alt-test')

    assert.equal(getData(maki, 'src'), 'tasty-maki.png', 'should return value for data-attribute')

    const dataAttributes = getData(maki, 'alt', 'src')
    assert.deepEqual(dataAttributes, { alt: 'alt-test', src: 'tasty-maki.png' }, 'should return object for multiple data-attributes')
  })
})
