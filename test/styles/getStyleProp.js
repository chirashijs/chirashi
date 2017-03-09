import { assert } from 'chai'
import { getStyleProp } from 'chirashi'

describe('chirashi#getStyleProp', () => {
  it('should be a function', () => {
    assert.isFunction(getStyleProp)
  })

  it('should return value for element\'s style property', () => {
    let div = document.createElement('div')
    div.classList.add('get-style', 'test')
    document.body.appendChild(div)

    Object.assign(div.style, {
      zIndex: '2',
      display: 'block',
      position: 'relative',
      top: '10px'
    })

    assert.equal(getStyleProp(div, 'display'), 'block', 'should return the value if only one prop')
    assert.deepEqual(getStyleProp(div, 'top', 'zIndex'), { top: 10, zIndex: 2 }, 'should return an object containing props with associated value and parse value when in pixel')
    assert.equal(getStyleProp(null), false, 'should return false if no element')

    document.body.removeChild(div)
  })
})
