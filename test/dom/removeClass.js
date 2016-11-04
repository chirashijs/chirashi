import { assert } from 'chai'
import Chirashi from '../../src'

window.describe('chirashi#removeClass', () => {
  window.it('should be a function', () => {
    assert.isFunction(Chirashi.removeClass)
  })

  window.it('should apply class on element', () => {
    const maki = document.createElement('div')
    maki.classList.add('cheese')
    Chirashi.removeClass(maki, 'cheese')

    assert.isFalse(maki.classList.contains('cheese'))
  })
})
