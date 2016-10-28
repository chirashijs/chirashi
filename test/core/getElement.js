import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#getElement', () => {
  window.it('should return a function', () => {
    assert.equal(typeof Chirashi.getElement, 'function')
  })

  window.it('should return element', () => {
    let yakitori = document.createElement('a')
    yakitori.classList.add('yakitori')
    document.body.appendChild(yakitori)

    assert.equal(yakitori, Chirashi.getElement(yakitori), 'should work for dom element')
    assert.equal(yakitori, Chirashi.getElement('a'), 'should work for tag selector')
    assert.equal(yakitori, Chirashi.getElement('.yakitori'), 'should work for class selector')
    assert.equal(yakitori, Chirashi.getElement([yakitori, 'yakitori']), 'should return first for array')
    assert.equal(null, Chirashi.getElement('.unknown'), 'should return null for unknown')

    document.body.removeChild(yakitori)
  })
})
