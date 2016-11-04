import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#getStyle', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.getStyle)
  })

  window.it('should return value for element\'s style property', () => {
    let div = document.createElement('div')
    div.classList.add('get-style', 'test')
    document.body.appendChild(div)

    Object.assign(div.style, {
      display: 'block',
      position: 'relative',
      top: '10px'
    })

    assert.equal(Chirashi.getStyle(div, 'display'), 'block', 'should return value for style property')
    assert.equal(Chirashi.getStyle(div, 'top'), 10, 'should return px values as Number')
    assert.equal(Chirashi.getStyle(null), undefined, 'should return undefined if no element')

    document.body.removeChild(div)
  })
})
