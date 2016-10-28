import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#hide', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.hide, 'function')
  })

  window.it('should set element\'s visibility to hidden', () => {
    let div = document.createElement('div')
    div.classList.add('hide', 'test')
    document.body.appendChild(div)

    Chirashi.hide(div)

    assert.equal(div.style.visibility, 'hidden')

    document.body.removeChild(div)
  })
})
