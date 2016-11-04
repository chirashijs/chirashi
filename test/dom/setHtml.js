import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#setHtml', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.setHtml)
  })

  window.it('should set property on element', () => {
    const title = document.createElement('h1')

    Chirashi.setHtml(title, 'salmon')

    assert.equal(title.innerHTML, 'salmon')
  })
})
