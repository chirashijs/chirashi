import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#getHtml', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.getHtml)
  })

  window.it('should return inner html of element', () => {
    const maki = document.createElement('p')
    maki.innerHTML = 'this maki contains cheese'

    assert.equal(Chirashi.getHtml(maki), 'this maki contains cheese')
  })
})
