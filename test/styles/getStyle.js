import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#getStyle', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.getStyle, 'function')
  })

  window.it('should return value for element\'s style property', () => {
    let div = document.createElement('div')
    div.classList.add('test')
    document.body.appendChild(div)

    Object.assign(div.style, {
      display: 'block',
      padding: '10px'
    })

    assert.equal(Chirashi.getStyle(div, 'display'), 'block', 'should return value for style property')
    assert.equal(Chirashi.getStyle(div, 'padding'), 10, 'should return px values as Number')

    document.body.removeChild(div)
  })
})
