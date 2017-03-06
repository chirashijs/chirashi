import { assert } from 'chai'
import { getComputedStyle } from 'chirashi'

describe('chirashi#getComputedStyle', () => {
  it('should be a function', () => {
    assert.isFunction(getComputedStyle)
  })

  it('should return value for element\'s style property', () => {
    let div = document.createElement('div')
    div.classList.add('get-style', 'test')
    document.body.appendChild(div)

    Object.assign(div.style, {
      display: 'block',
      position: 'relative',
      top: '10px'
    })

    const getStyle = getComputedStyle(div)
    const vanillaStyle = {...window.getComputedStyle(div)}
    assert.sameDeepMembers(Object.keys(getStyle), Object.keys(vanillaStyle), 'should return a copy of element\'s computed style')
    assert.equal(getComputedStyle(null), false, 'should return false if no element')

    document.body.removeChild(div)
  })
})
