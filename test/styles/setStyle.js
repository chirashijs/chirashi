import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#setStyle', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.setStyle, 'function')
  })

  window.it('should set value for element\'s style property', () => {
    let div = document.createElement('div')
    div.classList.add('test')
    document.body.appendChild(div)

    Chirashi.setStyle(div, {
      display: 'block',
      padding: 10
    })

    assert.equal(div.style.display, 'block', 'should set value for style property')
    assert.equal(div.style.padding, '10px', 'should set numbers values as px if property isn\'t unitless')

    document.body.removeChild(div)
  })
})
