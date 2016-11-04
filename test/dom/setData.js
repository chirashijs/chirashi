import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#setData', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.setData)
  })

  window.it('should set data-attribute on element', () => {
    const maki = document.createElement('div')

    Chirashi.setData(maki, { fish: 'salmon' })

    assert.equal(maki.getAttribute('data-fish'), 'salmon')
  })
})
