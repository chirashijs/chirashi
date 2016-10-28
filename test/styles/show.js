import assert from 'assert'
import Chirashi from '../../src'

window.describe('chirashi#show', () => {
  window.it('should be a function', () => {
    assert.equal(typeof Chirashi.show, 'function')
  })

  window.it('should set element\'s visibility to visible', () => {
    let div = document.createElement('div')
    div.classList.add('show', 'test')
    document.body.appendChild(div)
    div.style.visibility = 'hidden'

    Chirashi.show(div)

    assert.equal(div.style.visibility, 'visible')

    document.body.removeChild(div)
  })
})
