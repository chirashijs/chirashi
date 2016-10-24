import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#getElement', () => {
  window.it('should return a function', () => {
    assert.equal(typeof Chirashi.getElement, 'function')
  })

  window.it('should return element', () => {
    let div = document.createElement('div')
    div.classList.add('test')
    document.body.appendChild(div)

    assert.equal(div, Chirashi.getElement(div), 'should work for dom element')
    assert.equal(div, Chirashi.getElement('div'), 'should work for tag selector')
    assert.equal(div, Chirashi.getElement('.test'), 'should work for class selector')
    assert.equal(div, Chirashi.getElement([div, 'test']), 'should return first for array')
    assert.equal(null, Chirashi.getElement('.unknown'), 'should return null for unknown')

    document.body.removeChild(div)
  })
})
