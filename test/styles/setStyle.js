import { assert } from 'chai'
import { setStyle } from 'chirashi'

describe('chirashi#setStyle', () => {
  it('should be a function', () => {
    assert.isFunction(setStyle)
  })

  it('should set value for element\'s style property', () => {
    let div = document.createElement('div')
    div.classList.add('set-style', 'test')
    document.body.appendChild(div)

    setStyle(div, {
      zIndex: 2,
      display: 'block',
      padding: 10
    })

    assert.equal(div.style.display, 'block', 'should set value for style property')
    assert.equal(div.style.zIndex, 2, 'should set value for unitless style property')
    assert.equal(div.style.padding, '10px', 'should set numbers values as px if property isn\'t unitless')
    assert.sameDeepMembers([window], setStyle(window, { background: 'red' }), 'should return if element doesn\'t have style property')

    document.body.removeChild(div)
  })
})
